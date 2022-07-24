---
title: 手动
sidebar_position: 2
---


:::info

平台：Ubuntu18.04/20.04

:::



## [设置静态IP/修改hosts名称](https://www.zhangshitao.top/2022-5-7-staticIP)

方便节点统一化管理




## 安装Docker

参考[链接](https://www.zhangshitao.top/2022-3-9-edgex-env)



## 选择你要部署的类型👇

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="master" label="master" default>



#### k8s安装

#### 关闭防火墙

```shell
sudo ufw disable
```

#### 关闭selinux

```shell
sudo apt install selinux-utils
sudo setenforce 0
```

#### 禁止swap分区

```shell
sudo swapoff -a
sudo gedit /etc/fstab		注释掉swap一行
```

#### 登陆root用户：

#### 桥接的IPV4流量传递到iptables 的链

```shell
cat > /etc/sysctl.d/k8s.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system #生效
```

#### 配置k8s资源

```shell
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -

echo "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main" >/etc/apt/sources.list.d/kubernetes.list

apt-get update
```

#### 安装kubeadm(初始化cluster)，kubelet(启动pod)和kubectl(k8s命令工具)

```shell
sudo apt-get install -y kubelet=1.22.6-00 kubeadm=1.22.6-00 kubectl=1.22.6-00
```

#### 设置开机启动并启动kubelet

```shell
systemctl enable kubelet && systemctl start kubelet
```

#### 初始化集群

```shell
kubeadm config images pull 
kubeadm init --image-repository=registry.aliyuncs.com/google_containers  --pod-network-cidr=10.244.0.0/16	 --service-cidr=10.96.0.0/12
```

#### 记录join并在从节点执行这句话

```shell
kubeadm join 172.16.206.13:6443 --token 9pslv8.6tbrux0ksur0wgav --discovery-token-ca-cert-hash sha256:3709a3ce5a0ec819308d97a97c445a0414b0ed07a855cb3f948c288f38c7e35c 
```

- 若没有记录，也可在master节点用以下操作获取：`kubeadm token create --print-join-command`

#### 使能kubectl

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

#### 网络插件

```shell
sudo kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

- 如果报错，浏览器打开网站复制到新建本地文本`kube-flannel.yml`，执行`sudo kubectl apply -f kube-flannel.yml`

#### 查询组件状态

```shell
kubectl get cs
```

#### 解决组件状态Unhealthy

- 需要用#注释掉`/etc/kubernetes/manifests`下的`kube-controller-manager.yaml和kube-scheduler.yaml的- – port=0`

#### 注释完后重启服务

```shell
systemctl restart kubelet.service
```

#### 再次查看组件状态（需要稍等）

```shell
kubectl get cs
```

#### 查看节点状态

```shell
kubectl get node
```


#### 查看pod状态

```shell
kubectl get pod -n kube-system -o wide 
```

- 若flannel没起来则查看其日志：

```shell
kubectl -n kube-system logs kube-flannel-ds-g59k5
kubectl describe node ubuntu02｜grep cider
```


```shell
kubeadm reset
```

**--------------------------------------------------下面是Kuboard----------------------------------------------------**

#### Kuboard使用 hostPath 提供持久化存储

#### Kuboard v3 在 K8S 中的安装（主）

```shell
kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3-swr.yaml
```

#### 等待 Kuboard v3 就绪

```shell
watch kubectl get pods -n kuboard
```

#### 访问Kuboard

```shell
网址：localhost:30080
用户名：admin
密码：Kuboard123
```

#### Kuboard NFS

#### 在master节点中安装nfs服务器端

```shell
sudo apt-get install nfs-kernel-server
```

#### 共享目录配置文件

```shell
sudo mkdir -p ./mnt/nfs
sudo gedit /etc/exports
```

- 再上面文件中添加：`/mnt/nfs *(rw,sync,no_root_squash)`  # 手动替换$USER为用户名


```shell
sudo exportfs -arv
```

#### 启动NFS服务

```shell
sudo /etc/init.d/nfs-kernel-server restart
```

#### 查看

~~~shell
df -h /mnt/nfs/
~~~



  </TabItem>
  <TabItem value="worker" label="worker">

#### 安装nfs

```shell
apt-get install nfs-common -y
```

```shell
sudo gedit /etc/exports
192.168.1.200:/mnt/nfa  /mnt/nfs nfs rw 0 0
```

#### 安装Kubernetes

资源足够可装k8s，否则k3s

:::info
如果需要加入集群，需要将master的/etc/kubernetes/admin.conf拷贝到worker中，然后worker节点执行以下命令即可使用kubectl

~~~shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
~~~

:::

#### k3s 

~~~shell
curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn INSTALL_K3S_VERSION=v1.22.5+k3s1 INSTALL_K3S_EXEC="--no-deploy traefik --no-deploy local-storage --docker --write-kubeconfig ~/.kube/config --write-kubeconfig-mode 666" sh -
~~~

#### k8s

:::caution

参照上一篇安装k8s只需进行到设置'开机启动并启动kubelet'步骤，不要初始化集群。

```shell
# 加入集群
kubeadm token create --print-join-command # master执行获取命令
sudo kubeadm join 172.16.206.13:6443 --token 9pslv8.6tbrux0ksur0wgav --discovery-token-ca-cert-hash sha256:3709a3ce5a0ec819308d97a97c445a0414b0ed07a855cb3f948c288f38c7e35c # worker执行即可加入master集群
```

:::

  </TabItem>
</Tabs>



