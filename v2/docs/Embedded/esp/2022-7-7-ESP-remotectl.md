---
title: 💡远程控制LED
sidebar_position: 2
---



## 代码


~~~python
import socket
import time
import network
import machine


def do_connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect('z', 'jiugejiu')
        i = 1
        while not wlan.isconnected():
            print("正在链接...{}".format(i))
            i += 1
            time.sleep(1)
    print('network config:', wlan.ifconfig())


def start_udp():
    # 2. 启动网络功能（UDP）

    # 2.1. 创建udp套接字
    udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    # 2.2. 绑定本地信息
    udp_socket.bind(("0.0.0.0", 7788))

    return udp_socket


def main():
    # 1. 链接wifi
    do_connect()
    # 2. 创建UDP
    udp_socket = start_udp()
    # 3. 创建灯对象
    led = machine.Pin(22, machine.Pin.OUT)
    # 4. 接收网络数据
    print("初始化完成")
    while True:
        recv_data, sender_info = udp_socket.recvfrom(1024)#一次最大接收1024字节
        print("{}发送{}".format(sender_info, recv_data))
        recv_data_str = recv_data.decode("utf-8")
        try:
            print(recv_data_str)
        except Exception as ret:
            print("error:", ret)
        
        # 5. 处理接收的数据
        if recv_data_str == "light on":
            print("开灯...")
            led.value(0)
        elif recv_data_str == "light off":
            print("关灯...")
            led.value(1)


if __name__ == "__main__":
    main()
~~~

## 效果

