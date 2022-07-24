---
title: 🍦安装
sidebar_position: 1
---

:::info

kubeedge : v1.10.0  
k8s : v1.22.6

:::


```shell
ps aux | grep 'cloudcore' # 查看进程
netstat -nplt	#查看端口占用情况
ctr plugins ls	#cri
getconf LONG_BIT
uname -a
```

:::info

cloudcore 部署为容器，修改configmap配置文件后重启cloudcore

edgecore 的websocket server地址需要修改，修改后重启edgecore

beta部署

:::

## [Static IP & hostname](https://www.zhangshitao.top/2022-5-7-staticIP)



## 安装k8s集群

只需要初始化master即可，可参照[自动部署](https://www.zhangshitao.top/2022-5-7-k8s-Automatic)，完成之后注意删除master的污点

工作节点都需要安装docker

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```



## kuboard（可选）

```shell
kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3-swr.yaml
```

## [安装helm（可选）](https://helm.sh/docs/intro/install/)

```shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```



## [安装KubeEdge](https://kubeedge.io/en/docs/setup/keadm/)

### Cloud

下载kubeedge安装管理[keadm](https://github.com/kubeedge/kubeedge/releases)，到所在目录打开终端，以root用户运行

~~~shell
mkdir -p /etc/kubeedge/config/
chmod +x cloudcore && mv cloudcore /usr/bin
chmod +x keadm && mv keadm /usr/bin
cp kubeedge/build/tools/certgen.sh /etc/kubeedge/

keadm beta init --advertise-address=192.168.1.200  --kube-config=/root/.kube/config
keadm gettoken 	# 安装完成之后获取token

keadm beta init --set server.advertiseAddress="{192.168.1.200}" --set server.nodeName=master  --kube-config=/root/.kube/config --force --external-helm-root=/home/edge/Desktop/edgemesh/build/helm --profile=edgemesh   # 添加edgemesh组件WW

cd /etc/kubeedge/
export CLOUDCOREIPS="192.168.1.200"
echo $CLOUDCOREIPS
bash certgen.sh stream		#生成证书

~~~


```shell
# 手动安装edgemesh
helm install edgemesh \
--set server.nodeName=master \
--set server.advertiseAddress="{192.168.1.200}" \
https://raw.githubusercontent.com/kubeedge/edgemesh/main/build/helm/edgemesh.tgz
```



### Edge

~~~shell
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}
EOF
systemctl restart docker


chmod +x edgecore && mv edgecore /usr/bin
chmod +x keadm && mv keadm /usr/bin

#Docker
keadm join --cloudcore-ipport=192.168.1.200:10000 --edgenode-name=zhang --kubeedge-version=1.10.0  --token=b31f337b13e763a51a0e93e920a6f9b9148d3b941ff3735ef49095d8d8f09750.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTM5NjA2ODd9.uSVR0asdv3mCODTwHomrbcioh3torH18iRj_u35P4tE


edgecore --defaultconfig > /etc/kubeedge/config/edgecore.yaml  	#修改文件以部署edgemesh
systemctl daemon-reload
systemctl restart edgecore

 journalctl -u edgecore.service -xe
~~~

:::warning

需要修改

```yaml
websocket:
  enable: true
  handshakeTimeout: 30
  readDeadline: 15
  server: 192.168.1.200:10000  # ip改为masterIP，否则websocket错误无法启动
```

:::
