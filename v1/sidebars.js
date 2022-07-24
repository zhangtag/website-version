module.exports = {
  docs: [
    'Home',
    {
      type: 'category',
      label: '嵌入式札记',
      collapsible: true, // 设置此分类可以折叠或展开
      collapsed: true, // 设置此分类是默认的初始状态是折叠还是展开
      items: [{
          type: 'category',
          label: 'Canopen',
          items: ['2021-10-23-CANtheory',
            '2021-11-24-CANconfig',
            '2021-12-2-CANTimer',
            '2021-12-2-CANOpen',
          ]
        },
        {
          type: 'category',
          label: 'ESP',
          items: ['2022-7-6-ESP',
            '2022-7-7-ESP-remotectl',
          ]
        },
      ],
    },
    {
      type: 'category',
      label: '容器技术',
      collapsible: true, // 设置此分类可以折叠或展开
      collapsed: true, // 设置此分类是默认的初始状态是折叠还是展开
      items: ['2022-1-25-docker',
        {
          type: 'category',
          label: 'k8s',
          items: ['2022-5-7-k8s',
            {
              type: 'category',
              label: '集群部署',
              items: ['2022-5-7-k8s-Automatic',
                '2022-5-7-k8s-Manually',
              ]
            },
          ]
        },
      ]
    },

    {
      type: 'category',
      label: '边缘计算',
      collapsible: true, // 设置此分类可以折叠或展开
      collapsed: true, // 设置此分类是默认的初始状态是折叠还是展开
      items: [
        '2022-4-14-EdgeComputing',
        {
          type: 'category',
          label: 'KubeEdge',
          items: [{
              type: 'category',
              label: '安装',
              items: ['2022-4-13-KubeEdge-install',
                '2022-5-25-KubeEdge-installonpi',
              ]
            },
            {
              type: 'category',
              label: '示例',
              items: ['2022-5-28-KubeEdge-example-led', ]
            },
            '2022-5-14-kubeedge-notes',
          ]
        },
        {
          type: 'category',
          label: 'EdgeX Foundry',
          items: ['2022-3-9-edgex-env',
            '2022-1-30-edgex-quickstart',
            '2022-3-23-edgex-mqtt',
            '2022-3-10-edgex-notes',
          ]
        },
        {
          type: 'category',
          label: 'Baetyl',
          items: ['2022-3-28-Baetyl',
            '2022-5-7-Baetyl-install',
            '2022-3-31-Baetyl-notes',
          ]
        },
      ]
    },

    {
      type: 'category',
      label: '神经网络',
      collapsible: true, // 设置此分类可以折叠或展开
      collapsed: true, // 设置此分类是默认的初始状态是折叠还是展开
      items: [{
          type: 'category',
          label: 'Yolo',
          items: ['2021-11-2-yoloinfo',
            '2021-10-28-yoloenv',
            '2021-10-28-yoloyaml',
          ]
        },
        {
          type: 'category',
          label: 'RNN',
          items: ['2022-4-20-RNN-sin', ]
        },
      ]
    },

    {
      type: 'category',
      label: '软路由',
      collapsible: true, // 设置此分类可以折叠或展开
      collapsed: true, // 设置此分类是默认的初始状态是折叠还是展开
      items: [
        '2021-11-14-router',
        '2021-11-14-router-make',
        '2021-11-14-router-install',
      ],
    },

    {
      type: 'category',
      label: '工作指南',
      collapsible: true, // 设置此分类可以折叠或展开
      collapsed: true, // 设置此分类是默认的初始状态是折叠还是展开
      items: [
        '2021-12-20-proxy',
        '2022-5-7-staticIP',
        '2022-7-8-Git',
      ]
    },

  ],
};