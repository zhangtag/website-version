module.exports = {
  mySidebar: [
    {
      type: 'category',
      label: 'Home',
      items: ['home/introduction', 
      // 'home/contributing'
    ],
    },
    //需要自定义
    //主页左侧标签
    {
      type: 'category',
      label: 'Topics',
      items: [
        {
          type: 'link',
          label: '📊 嵌入式札记',
          href: '/Embedded/About-Embedded',
        },
        {
          type: 'link',
          label: '☁️ 云原生',
          href: '/cloudnative/About-cloud-native',
        },
        {
          type: 'link',
          label: '💻 边缘计算',
          href: '/edgecomputing/About-edgecomputing',
        },
        {
          type: 'link',
          label: '🤖 神经网络',
          href: '/Neural-Net/About-Neural-Net',
        },
        {
          type: 'link',
          label: '📝 小芝士',
          href: '/tips/About-tips',
        },
        // {
        //   type: 'link',
        //   label: '🧰 Tools',
        //   href: '/tools/About-tools',
        // },
      ],
    },
  ],
};
