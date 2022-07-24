---
title: EdgeX开发环境
---

:::info

该篇详细说明了EdgeX的开发环境依赖及其安装

:::

## 安装Docker以及Dokcer-compose

### [安装Docker](https://www.runoob.com/docker/edgex-build/ubuntu-docker-install.html)

```shell
#使用一键脚本安装
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
#查看docker是否安装成功
docker --version
```

### 添加Docker国内镜像源

```shell
# 打开阿里云控制台https://cr.console.aliyun.com/,搜索镜像加速器
#根据操作文档配置即可
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://w5jr57i0.mirror.aliyuncs.com"]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 将用户添加到docker组

```shell
# 将用户加入到docker 组
sudo gpasswd -a ${USER}  docker
newgrp docker

# 修改docker使用systemd管理资源
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF
systemctl restart docker
```


### [安装Docker Compose](https://docs.docker.com/compose/install/)

```shell
# 基于ubuntu x86_64
# 下载Docker Compose的当前稳定版本
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
#查看docker-compose是否安装成功
docker-compose --version
# 注意！修改/移动文件夹名称会导致edgex无法使用docker-compose命令，务必先停止再修改/移动
```


## 安装Go语言开发环境

前往Golang[官网下载](https://go.dev/doc/install)最新安装包并按照文档操作。或者

~~~shell
sudo snap install go
~~~



### 配置环境变量
```shell
# 配置用户环境
#编辑/etc/profile文件，添加到末尾：
sudo gedit /etc/profile
export PATH=$PATH:/usr/local/go/bin #添加到系统环境变量

#配置root 环境变量
sudo gedit /etc/sudoers
#在secure_path中添加
:/usr/local/go/bin
```

保存后，使用命令 `source /etc/profile`生效。

配置完成后，输入go version可以查看安装的版本。

```shell
go  version
sudo go  version
```

## 配置编译镜像源

```shell
go env -w GONOSUMDB=\*                  ## 配置GONOSUMDB,暂不支持sumdb索引
go env -w GOPROXY=https://goproxy.cn    ## 配置GOPROXY,可以下载墙外代码
```

### 测试

配置完后，测试能够正常编译go文件，首先创建helloworld包和对应go源文件：

```go
$ mkdir -p go/src/helloworld
$ cd go/src/helloworld
$ touch helloworld.go
```

向源文件写入代码：

```go
package main
import "fmt"

func main() {
    fmt.Printf("hello, world\n")
}
```

之后开始编译：

```go
$ cd $HOME/go/src/helloworld
$ go build
```

编译通过后会生成对应可执行文件

```go
$ cd $HOME/go/src/helloworld
$ go build
$ ls
helloworld  helloworld.go
$ ./helloworld
hello, world
```

## 安装[Redis](https://redis.io/download)
```shell
# edgex部分微服务使用Redis传输数据，如传感器数据。
# edgex中已有该服务，可以单独启动redis容器，从而不需要安装，安装之后每次通过compose启动edgex时需要先关闭redis
redis-cli shutdown # 关闭redis
sudo add-apt-repository ppa:redislabs/redis # 通过Ubuntu添加ppa源安装,推荐该方法
sudo apt-get update
sudo apt-get install redis

sudo snap install redis  # 通过snap安装
redis-cli help 			# 查看版本
```

## **安装Zero MQ**

```shell
git clone https://gist.github.com/katopz/8b766a5cb0ca96c816658e9407e83d00
sudo bash setup-zeromq.sh
```

