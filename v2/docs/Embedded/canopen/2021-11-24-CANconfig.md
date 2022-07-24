---
title: ☕移植篇：CAN配置
sidebar_position: 2
---

:::info
硬件：STM32F407开发板，CAN调试器，ST—LINK调试器
:::

## 使用CUBEMX创建工程  
## 选用外部高速晶振  
![0.0](/img/canconfig/0.0.png)  

## 配置时钟树  
HCLK一般为默认最高，CAN使用的是APB1外设时钟。选择时钟源，输入需要的频率按回车即可自动调整其他参数  
![0.1](/img/canconfig/0.1.png)  

## 配置CAN  
使能后需要根据波特率对参数进行调整，当然也可以在程序中修改。  
上图中可见APB1为42MHz，经过下图中预分频之后 42/3 = 14MHz。 
**如果我们希望得到1MHz波特率，那只需满足Jumpwidth+seg1+seg2= 14MHz / 1MHz = 14即可，**其他波特率以此类推，也可以使用代码块实现波特率的配置。  

```

#if defined (SOC_SERIES_STM32F1)/* APB1 36MHz(max) */
static const struct stm32_baud_rate_tab can_baud_rate_tab[] =
{
    {CAN1MBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 3)},
    {CAN800kBaud, (CAN_SJW_2TQ | CAN_BS1_5TQ  | CAN_BS2_3TQ | 5)},
    {CAN500kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 6)},
    {CAN250kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 12)},
    {CAN125kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 24)},
    {CAN100kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 30)},
    {CAN50kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 60)},
    {CAN20kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 150)},
    {CAN10kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ  | CAN_BS2_3TQ | 300)}
};
#elif defined (SOC_SERIES_STM32F4)/* APB1 42MHz(max) */
static const struct stm32_baud_rate_tab can_baud_rate_tab[] =
{
    {CAN1MBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 3)},
    {CAN800kBaud, (CAN_SJW_2TQ | CAN_BS1_8TQ | CAN_BS2_4TQ | 4)},
    {CAN500kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 6)},
    {CAN250kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 12)},
    {CAN125kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 24)},
    {CAN100kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 30)},
    {CAN50kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 60)},
    {CAN20kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 150)},
    {CAN10kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ | CAN_BS2_4TQ | 300)}
};
#elif defined (SOC_SERIES_STM32F7)/* APB1 54MHz(max) */
static const struct stm32_baud_rate_tab can_baud_rate_tab[] =
{
    {CAN1MBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 3)},
    {CAN800kBaud, (CAN_SJW_2TQ | CAN_BS1_9TQ  | CAN_BS2_7TQ | 4)},
    {CAN500kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 6)},
    {CAN250kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 12)},
    {CAN125kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 24)},
    {CAN100kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 30)},
    {CAN50kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 60)},
    {CAN20kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 150)},
    {CAN10kBaud, (CAN_SJW_2TQ | CAN_BS1_10TQ  | CAN_BS2_7TQ | 300)}
};
#endif
```



![0.1](/img/canconfig/0.2.png)  

## 生成代码并运行试车  
cubemx生成的默认代码只有初始化can的代码，开启can以及发送接收函数均需要自己编写，这部分可参照*_hal_can.c中提供的接口，也可以从网上直接copy，以下来自正点原子   

```
void CAN_Config(void)
{
  CAN_FilterTypeDef  sFilterConfig;

  /*##-2- Configure the CAN Filter ###########################################*/
  sFilterConfig.FilterBank = 0;
  sFilterConfig.FilterMode = CAN_FILTERMODE_IDMASK;
  sFilterConfig.FilterScale = CAN_FILTERSCALE_32BIT;
  sFilterConfig.FilterIdHigh = 0x0000;
  sFilterConfig.FilterIdLow = 0x0000;
  sFilterConfig.FilterMaskIdHigh = 0x0000;
  sFilterConfig.FilterMaskIdLow = 0x0000;
  sFilterConfig.FilterFIFOAssignment = CAN_RX_FIFO0;
  sFilterConfig.FilterActivation = ENABLE;
  sFilterConfig.SlaveStartFilterBank = 14;

  if (HAL_CAN_ConfigFilter(&hcan1, &sFilterConfig) != HAL_OK)
  {
    /* Filter configuration Error */
    while(1)
	  {
	  }
  }

  /*##-3- Start the CAN peripheral ###########################################*/
  if (HAL_CAN_Start(&hcan1) != HAL_OK)
  {
    /* Start Error */
    while(1)
	  {
	  }
  }

  /*##-4- Activate CAN RX notification #######################################*/
  if (HAL_CAN_ActivateNotification(&hcan1, CAN_IT_RX_FIFO0_MSG_PENDING) != HAL_OK)
  {
    /* Notification Error */
    while(1)
	  {
	  }
  }

  /*##-5- Configure Transmission process #####################################*/
  TxHeader.StdId = 0x321;
  TxHeader.ExtId = 0x01;
  TxHeader.RTR = CAN_RTR_DATA;
  TxHeader.IDE = CAN_ID_STD;
  TxHeader.DLC = 2;
  TxHeader.TransmitGlobalTime = DISABLE;
}
```



```
u8 CAN1_Send_Msg(u8* msg,u8 len)
{
    u8 i=0;
	  u32 TxMailbox=0;
  	u8 message[8];
    TxHeader.StdId=0X12;        //
    TxHeader.ExtId=0x12;        //
    TxHeader.IDE=CAN_ID_STD;    //使用标准帧
    TxHeader.RTR=CAN_RTR_DATA;  //
    TxHeader.DLC=len;                
    for(i=0;i<len;i++)
    {
		message[i]=msg[i];
	}
    if(HAL_CAN_AddTxMessage(&hcan1, &TxHeader, message, &TxMailbox) != HAL_OK)//·¢ËÍ
	{
		return 1;
	}
	while(HAL_CAN_GetTxMailboxesFreeLevel(&hcan1) != 3) {}
    return 0;
}
```

