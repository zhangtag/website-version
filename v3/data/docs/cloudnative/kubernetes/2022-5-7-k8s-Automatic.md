---
# slug: about

title: 自动安装

image: https://picx.zhimg.com/v2-9f5254f279df121d881a70807513b829_1440w.jpg?source=172ae18b

authors: [zhang]

# rf_type: image

rf_summary: 自动安装k8s集群

sidebar_position: 1

---


:::info

平台：Ubuntu20.04  
部署工具：kainstall

:::

## [设置静态IP](https://www.zhangshitao.top/2022-5-7-staticIP)
如果机器重启后，路由分配了其他IP，那集群将因为IP地址不匹配而无法启动

## 开启SSH root用户登录
~~~shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get -y install openssh-server

sudo gedit /etc/ssh/sshd_config
PermitRootLogin yes #添加该行，允许以root身份登录

sudo passwd root #修改root密码

systemctl restart sshd
~~~



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 推荐的自动部署应用👇

<Tabs>
  <TabItem value="sealos" label="sealos⭐" default>

#### 项目[主页](https://github.com/labring/sealos)👈  

#### 初始化集群

~~~shell
sealos init --passwd '0' \
	--master 192.168.1.200  \
	--pkg-url kube1.22.6.tar.gz \
	--version v1.22.6
~~~

  </TabItem>



  <TabItem value="kainstall" label="kainstall" >

#### 克隆代码

~~~shell
git clone https://github.com/lework/kainstall.git
~~~

#### 初始化集群

~~~shell
bash kainstall-ubuntu.sh init \
  --master 192.168.1.200 \
  --user root \
  --password 0 \
  --port 22 \
  --version 1.22.6 \
  --ui kuboard  \
  --10years
~~~

一般情况下可以直接部署完毕

~~~shell
kubectl get pods,svc -o wide -A #查看集群信息
~~~

  </TabItem>
</Tabs>





