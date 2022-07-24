---
title: 烂笔头
---

1. edgex源码开始是以java为基础，但是体积太大所以用Go语言改写，同时提供了部分C的开发SDK。

2. edgex-go可以说是项目的框架代码，其依赖项很多，在每个微服务的main.go中都写了依赖的库。（目前遇到的问题：import的github仓库无法自动下载，导致make build出错。//已解决，见第4）

3. 推测设备层运行逻辑：可以使用官方提供的device-sdk编辑添加设备，这些设备可以支持多种协议，（修改之后是否需要再次编译？）之后需要在控制台添加设备（地址，名称，协议等等）。

4. Go语言安装包应该去**官网[下载](https://go.dev/doc/install)**！！否则make build报错（旧版go没有mod，导致不能下载依赖包，而Ubuntu官方apt安装的不支持mod!）！！

5. go语言在编译、运行时会将依赖存放到go.mod中，编译、运行时都会检测依赖，然后下载。

6. 在该[教程Getting Started - Go Developers](https://docs.edgexfoundry.org/2.2/getting-started/Ch-GettingStartedGoDevelopers/)中，执行二进制文件之前，应该先暂定所有容器 `docker stop $(docker ps -a -q)`（edgex相关容器会开机自启）。之后按照[Redis官方例程](https://redis.io/topics/quickstart)配置即可，端口号不用修改，Edgex和redis默认的一致。

7. edgex各个微服务均有对应的项目，可以对单个服务编译，然后运行。Working in a Hybrid Environment章节中，使用docker-compose启动之后，停止某一个微服务，通过编译源码启动该服务。

8. 根据[优酷一个edgex开发人员](https://www.youku.com/profile/index/?spm=a2hbt.13141534.1_1.1&uid=UNTMyODEzNjIxNg==)讲解，微服务的启动是有顺序的，而docker-composev1.0不能保证正常启动，所以建议自己编写脚本启动，一个启动之后启动下一个。对于最新版本不知道有没有解决该问题，待验证。

9. edgex运行有以下方法。
   * 通过docker-compose 启动，需要将各个微服务制作为镜像。
   * 通过编译源码。需要先启动redis数据库，再启动微服务。
   * docker-compose 启动，停止某个服务，再编译启动
   
10. 在通过编译运行代码后再通过docker-compose启动时，如果遇到错误`The container name "/edgex-support-scheduler" is already in use by container "4eb6c9a4ff6744df4d327c3444139f7a08b1fef51855507915ace42b5e8d2c77"`。可以通过`docker rm -f $(docker ps -aq)`先删除所有容器

11. 配置Redis后，Redis会加入自启动，所以通过docker-compose方式启动则需要先停止Redis `redis-cli shutdown` 

12. 官方docker-compose启动后会启动一些例程和微服务，对于mqtt、modbus等设备的接入需要编译运行device-modbus-go等工程，之后在web控制台即可见到相关设备协议，然后添加设备。

13. makefile的命令行，开头必须用tab键

14. 按F5调试

15. [自定义docker-compose文件](https://docs.edgexfoundry.org/2.2/getting-started/Ch-GettingStartedDockerUsers/)

* [安装kompose](https://kompose.io/installation/)
    
    ```sh
    curl -L https://github.com/kubernetes/kompose/releases/download/v1.26.1/kompose-linux-amd64 -o kompose
    chmod +x kompose
    sudo mv ./kompose /usr/local/bin/kompose
    ```


*    ```sh
    # 安装docker-compose
    git clone https://github.com/edgexfoundry/edgex-compose.git#克隆仓库
    cd edgex-compose/compose-builder 	#自定义详情可参照该目录下的README.md
    make gen no-secty ds-mqtt mqtt-broker
    ```

16. 添加设备工作流程：

    1. selectdeviceservice	选择设备的协议类型，如mqtt,modbus等等.
    2. SelectDeviceProfile    选择协议具体内容
    
17. 编译镜像，然后替换docker-compose文件中相关服务的image源。

17. windows下的换行为\r\n，而Linux下为\n，所以windows下编写的脚本在Linux上不能通用。

