---
title: 🥧在树莓派安装
sidebar_position: 2
---

:::tip

[nano编辑器](https://blog.csdn.net/yupen_Bob/article/details/119984649)

:::

## ssh root登录

~~~shell
sudo passwd root
sudo passwd --unlock root
sudo sed -i "s/^#PermitRootLogin.*/PermitRootLogin yes/g" /etc/ssh/sshd_config
sudo systemctl restart ssh
sudo cp ~/.bashrc /root/.bashrc
sudo reboot

#通过ssh从其他主机拷贝文件
scp root@master:/usr/local/bin/keadm /usr/local/bin 
~~~



## [关闭图像界面](https://blog.csdn.net/ansinyu/article/details/117712610)



## 更新源和软件

~~~shell
getconf LONG_BIT    #查看系统位数
uname -a    #显示系统信息
lsb_release -a    #查询系统版本
~~~
~~~shell
# 编辑 /etc/apt/sources.list 文件，删除原文件所有内容，用以下内容取代：
deb [arch=armhf] http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ bullseye main non-free contrib rpi
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ bullseye main non-free contrib rpi
# 编辑 /etc/apt/sources.list.d/raspi.list 文件，删除原文件所有内容，用以下内容取代：
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ bullseye main
~~~


```shell
apt-get update
apt-get upgrade --fix-missing
docker run hello-world
```

~~~shell
# 修改docker的管理方式
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}
EOF
systemctl restart docker
~~~

