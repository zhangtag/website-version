---
title: 🥕Baetyl 安装
hide_table_of_contents: true
---

:::info

集群信息：master 192.168.1.200  	worker 192.168.1.201

:::

## 设置静态IP/hostname




## [安装helm](https://helm.sh/docs/intro/install/)

```shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```



## 安装k8s



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Manually" label="手动">

:::info

​    🍎 [手动部署集群](https://www.zhangshitao.top/2022-5-7-k8s-Manually)

:::

  </TabItem>

  <TabItem value="Automatic" label="一键" default>

:::info

​    🍊 [一键自动化部署](https://www.zhangshitao.top/2022-5-7-k8s-Automatic)

:::

  </TabItem>
</Tabs>



## 安装数据库

### 创建pv

```shell
apiVersion: v1
kind: PersistentVolume
metadata:
      name: mariadb-master
      labels:
        app: mariadb
spec:
 capacity:
  storage: 8Gi
 accessModes:
  - ReadWriteOnce
 hostPath:
  path: /opt/mariadb-master
```

```shell
apiVersion: v1
kind: PersistentVolume
metadata:
      name: mariadb-slave
      labels:
        app: mariadb
spec:
 capacity:
  storage: 8Gi
 accessModes:
  - ReadWriteOnce
 hostPath:
  path: /opt/mariadb-slave
```

```shell
kubectl create -f db-master.yaml 
kubectl create -f db-slave.yaml
```

### 创建及初始化数据库

```shell
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mariadb --set auth.rootPassword=secrectpassword bitnami/mariadb
helm install phpmyadmin bitnami/phpmyadmin 

# 当创建单机版的 k8s 时，这个时候 master 节点是默认不允许调度 pod 手动部署时需要运行
kubectl taint nodes --all node-role.kubernetes.io/master- #将 master 标记为可调度

kubectl describe pod mariadb-0 #查看maridb所在节点
sudo chown 1001:root /opt/mariadb-master #若节点启动不了提示权限不足通过此命令获取权限，详情见本目录的烂笔头篇
sudo chown 1001:root /opt/mariadb-slave

echo "phpMyAdmin URL: http://127.0.0.1:8080"
kubectl port-forward --namespace default svc/phpmyadmin 8080:80
```

:::caution

注意修改 scripts/sql/data.sql 中 sync-server-address 和 init-server-address 为实际的服务器地址：  
比如服务部署在本机，则地址可配置如下：   
// 按照官方写0.0.0.0会报错无法启动core和broker  当前日期为2022年4月16日   
sync-server-address : https://192.168.1.200:30005	   
init-server-address : https://192.168.1.200:30003

:::

:::caution
用浏览器打开 http://127.0.0.1:8080/index.php  服务器输入：mariadb，账号输入：root，密码输入secrectpassword
若服务部署在非本机，请将IP更改为实际的服务器IP地址  
在web中先导入tables.sql再选中数据库导入data.sql
:::

## 克隆代码

```shell
git clone https://github.com/baetyl/baetyl-cloud.git
git reset --hard dd37b0f7d15	#切换分支
git reset --hard dcb569a
```

## 克隆镜像

```shell
docker pull baetyltech/baetyl-cloud:v2.2.1-rc11
docker pull baetyltechtest/baetyl-cloud:git-dcb569a
```

:::caution

修改 scripts/charts/baetyl-cloud/values.yaml 里的 image 配置项为上述镜像地址

:::


## Helm 快速安装Baetyl

### 手动导入 crd

```shell
kubectl apply -f ./scripts/charts/baetyl-cloud/apply/
```

### 安装baetyl-cloud

```shell
helm install baetyl-cloud ./scripts/charts/baetyl-cloud/ # 安装完成之后可以通过RESTful API http://0.0.0.0:30004 操作 baetyl-cloud API
```

### 安装边缘节点

```shell
curl -d "{\"name\": \"demo-node\",\"labels\": {\"baetyl-app-mode\":\"kube\"}}" -H "Content-Type: application/json" -X POST http://0.0.0.0:30004/v1/nodes #调用 RESTful API 创建节点
curl -d "{\"name\":\"demo-node\",\"labels\": {\"baetyl-app-mode\":\"kube\"},\"sysApps\":[\"baetyl-function\",\"baetyl-rule\"]}" -H "Content-Type: application/json" -X POST http://0.0.0.0:30004/v1/nodes # 添加包含baetyl-function官方模块，参见openapi

curl http://0.0.0.0:30004/v1/nodes/demo-node/init # 获取边缘节点的在线安装脚本，在目标节点安装即可
```

```sh
kubectl get pod -A
```

## 效果

安装完成之后主节点应包括如下pod

![img](/img/baetyl/env/1.0.png)

安装完成之后工作节点拥有如下pod

![](/img/baetyl/env/1.1.png)

