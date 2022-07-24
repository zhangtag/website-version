---
title: 设置静态IP/hostname
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="ubuntu" label="ubuntu" default>

## static IP

多节点统一化管理

~~~shell
ip a # 查看网络环境，主要查看网卡名称，
~~~

~~~shell
sudo gedit /etc/netplan/01-network-manager-all.yaml 
~~~

~~~shell
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
     ens33: #配置的网卡名称,使用ifconfig -a查看得到
       dhcp4: no #dhcp4关闭
       addresses: [192.168.1.200/24] #设置本机IP及掩码
       gateway4: 192.168.1.1 #设置网关
       nameservers:
         addresses: [8.8.8.8,223.5.5.5] #设置DNS
~~~

~~~shell 
sudo netplan apply
~~~

## 修改hosts名称

```shell
#master节点:
hostnamectl set-hostname master
#workernode1节点：
hostnamectl set-hostname worker

sudo gedit /etc/hosts
192.168.1.200 master
192.168.1.201 worker
```

  </TabItem>

  <TabItem value="raspberrypi" label="raspberrypi">

## static IP

~~~shell
sudo nano /etc/dhcpcd.conf # ctrl + x 退出
~~~

~~~shell
interface eth0
static ip_address=192.168.1.205/24
static routers=192.168.1.1
static domain_name_servers=8.8.8.8,223.5.5.5

interface wlan0
static ip_address=192.168.1.205/24
static routers=192.168.1.1
static domain_name_servers=8.8.8.8,223.5.5.5
~~~

  </TabItem>
</Tabs>
