---
title: mqtt开发测试记录
---

:::info

该篇示例了如何自建一个mqtt客服端并编辑mqtt微服务接入EdgeX

:::

## 安装开发环境
参照本目录[第一篇](https://www.zhangshitao.top/2022-3-9-edgex-env)

## 安装依赖

```shell
pip3 install paho-edgex/mqtt python-etcd
```


## [DEVICE-edgex/mqtt-GO源码](https://github.com/edgexfoundry/device-edgex/mqtt-go)解析记录

在源码的`edgex/mqtt.test.device.profile.yml`文件中

```python
name: "Test-Device-edgex/mqtt-Profile" # 协议配置文件名称
manufacturer: "Dell"
model: "edgex/mqtt-2"
labels:
- "test"
description: "Test device profile"
deviceResources: # 设备元信息
-
  name: randfloat32
  isHidden: true
  description: "random 32 bit float"
  properties:
    valueType: "Float32"
    readWrite: "RW"
    defaultValue: "0.00"
    minimum: "0.00"
    maximum: "100.00"
-
  name: randfloat64
  isHidden: true
  description: "random 64 bit float"
  properties:
    valueType: "Float64"
    readWrite: "RW"
    defaultValue: "0.00"
    minimum: "0.00"
    maximum: "100.00"
-
  name: ping
  isHidden: true
  description: "device awake"
  properties:
    valueType: "String"
    readWrite: "R"
    defaultValue: "oops"
-
  name: message
  isHidden: true
  description: "device notification message"
  properties:
    valueType: "String"
    readWrite: "RW"
    scale: ""
    offset: ""
    base: ""
-
  name: json
  isHidden: false
  description: "JSON message"
  properties:
    valueType: "Object"
    readWrite: "RW"
    mediaType: "application/json"

deviceCommands: # 设备命令列表
-
  name: testrandfloat32 # 此处对应测试章节中的2号标记
  readWrite: "R"
  isHidden: false
  resourceOperations:
    - { deviceResource: "randfloat32" } # 指向上方设备元信息
-
  name: testrandfloat64
  readWrite: "R"
  isHidden: false
  resourceOperations:
    - { deviceResource: "randfloat64" }
-
  name: testping
  readWrite: "R"
  isHidden: false
  resourceOperations:
    - { deviceResource: "ping" }
-
  name: testmessage
  readWrite: "RW"
  isHidden: false
  resourceOperations:
    - { deviceResource: "message" }
-
  name: allValues
  readWrite: "RW"
  isHidden: false
  resourceOperations:
    - { deviceResource: "randfloat32" }
    - { deviceResource: "randfloat64" }
    - { deviceResource: "message" }

```

## 自定义微服务步骤

1. ```sh
   git clone https://github.com/edgexfoundry/device-edgex/mqtt-go.git	# 克隆仓库
   ```

2. 编辑配置文件或者源码

3. ```sh
   cd device-edgex/mqtt-go
   docker build -t [name]:[tag] .		# 编译镜像
   docker images #查看镜像
   ```
   
3. 替换docker-compose文件中image的地址为上方编译的名称和tag
   
4. ```sh
   sudo docker-compose up		# 启动edgex
   ```

## 自定义docker-compose文件

:::note

编译带有edgex/mqtt的docker-compose文件：

```sh
git clone https://github.com/edgexfoundry/edgex-compose.git#克隆仓库
cd edgex-compose/ 	#自定义详情可参照该目录下的README.md
make gen no-secty ds-edgex/mqtt edgex/mqtt-broker  # 无安全验证，带mqtt和broker
```

:::

## 测试

```python
# mqtt 客户端，运行后会监听mqtt消息，配置见代码
import paho.edgex/mqtt.client as edgex/mqtt
import json
import random
import datetime

def on_message(client,userdata,msg):
    print(msg.topic + " " + str(msg.payload) + '\n')
    d = json.loads(msg.payload)

    if d['cmd'] == "message":
        if d['method'] == "get":
            d['message'] = datetime.datetime.now().strftime('%Y-%m-%d / %H:%M:%S')
        elif d['method'] == "set":
            d['result'] = "set success!" + d['message']
    
    if d['cmd'] == "ping":
        print("this is a ping cmd !")
        d['ping'] = "pong"

    if d['cmd'] == "randfloat32":
        print("randfloat32!")
        temp = random.uniform(0,100)
        d['randfloat32'] = temp

    print(json.dumps(d))
    client.publish("ResponseTopic",json.dumps(d))

def on_connect(client,userdate,flags,rc):
    print("Connected with result code " + str(rc))
    client.subscribe("CommandTopic")
    #client.subscribe("DataTopic")

client = edgex/mqtt.Client()
client.username_pw_set("admin","public")
client.on_message = on_message
client.on_connect = on_connect

client.connect("192.168.1.106",1883,60) # edgex宿主机ip

client.loop_forever()
```

![1](/img/edgex/mqtt/1.1.png)

点击try发送命令

![img](/img/edgex/mqtt/1.2.png)

.py文件输出

![img](/img/edgex/mqtt/1.3.png)



:::tip

修改command列表主要通过修改上方提到的profile.yml文件实现，修改之后需要在控制台重新添加设备才可显示。

:::

![img](/img/edgex/mqtt/1.4.png)
