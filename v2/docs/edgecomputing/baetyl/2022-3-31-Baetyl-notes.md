---
title: 🥔烂笔头
---

* helm是kubectl的包管理器，相当于py的pip

* mariadb一直处于pending状态，是因为没有分配储存卷，[按照链接](https://blog.csdn.net/liumiaocn/article/details/103388607)配置即可，但是仍然无法启动，提示权限不足

* 

  ```shell
  helm repo add apphub https://apphub.aliyuncs.com
  helm repo update
  ```

* 

 ```shell
The connection to the server localhost:8080 was refused - did you specify the right host or port? error
# 以下解决办法
mkdir -p $HOME/.kube		
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

helm install --name baetyl_mysql --set mysqlRootPassword=secretpassword,mysqlUser=test,mysqlPassword=test,mysqlDatabase=test stable/mysql
 ```

* 在执行[重启NFS任务时](https://blog.csdn.net/narcissus2_/article/details/119423389#t31)，如果失败

```shell
sudo /etc/init.d/nfs-kernel-server restart # 若重启失败,执行以下步骤
/home/zhang/panyang *(rw,sync,no_root_squash) # 添加用户目录zhang
sudo exportfs -arv 
```

* RESTful API 使用方法，[baetyl open api](https://openedge.tech/docs/cn/latest/_static/api.html#u67e5u8be2u8282u70b9u5173u8054u7684u5e94u75280a3ca20id3d22u67e5u8be2u8282u70b9u5173u8054u7684u5e94u7528223e203ca3e)

~~~shell
# 通过编写-X或--request，后跟请求方法来设置请求方法。
# 例如baetyl官方的api文档，查询节点关联的应用，使用如下命令
curl -X GET  http://0.0.0.0:30004/v1/nodes/demo-node/apps 

# 通过-H或--header选项发送带有curl的HTTP标头。
curl -H "Content-Type: application/json" https://api.github.com

# 执行基本身份验证，可以使用-u选项，后跟用户名和密码，
curl -x POST -u "username:password" https://api.github.com/user/repos

# 通过cURL发送数据，可以使用-d或--data选项
curl -X POST <URL> \
  -d property1=value1 \
  -d property2=value2
  
# 删除app
curl -X DELETE http://0.0.0.0:30004/v1/apps/{$name}
~~~

* 

  ```sh
  # 创建节点
  curl -d "{\"name\":\"demo-node\"}" -H "Content-Type: application/json" -X POST http://0.0.0.0:30004/v1/nodes
  
  curl  -H "Content-Type: application/json" -X PUT http://0.0.0.0:30004/v1/nodes?batch
  
  
  ```

* baetyl开源项目包含了云端管理框架（也可以部署在本地）和本地运行框架。

* baetyl会监控节点信息上报，k8s集群使用join加入后也会上报

* 将docker-compose文件转为k8s资源文件

  ```shell
  curl -L https://github.com/kubernetes/kompose/releases/download/v1.26.1/kompose-linux-amd64 -o kompose
  chmod +x kompose
  sudo mv ./kompose /usr/local/bin/kompose
  kompose convert -f docker-compose.yml
  ```

* 删除pv

  ```shell
  sudo kubectl delete pv ${pv-name}
  ```

* ubuntu基础依赖一键安装

  ```shell
  sudo apt-get -y install curl make git 
  ```

* ipvs有NAT、网关模式、ipip模式。其中只有nat支持端口端口映射，k8s service需要端口映射的功能，因此kube-proxy必然使用ipvs的NAT模式。

* 如80：32240/TCP为http代理端口，443:31335/TCP为https代理端口