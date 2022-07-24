/* eslint-disable */
const {
  tailwindPlugin,
  webpackPlugin,
} = require('./src/plugins');

const isDev = process.env.NODE_ENV === 'development';
const pageRef = require('./src/plugins/pageRef');

const pageOptions = {
  sidebarCollapsible: false,
  editUrl: 'https://github.com/zhangtag/zhangtag.github.io/edit/master',
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
  beforeDefaultRemarkPlugins: [
    pageRef,
  ],
};

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  scripts: [
    {
      src: "https://status.notes.nayanpatel.net/widget/script.js",
    },
  ],
  title: 'To my Blog',
  tagline: 'An awesome textbook alternative, that you can contribute to! 🚀',
  url: 'https://notes.nayanpatel.net',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'logo.ico',
  organizationName: 'zhangatag', // Usually your GitHub org/user name.
  projectName: 'Bolg', // Usually your repo name.
  clientModules: [require.resolve('./src/css/tailwind.css')],
  themeConfig: {
    umami: {
      websiteid: "67a6f4d2-2b85-4678-8972-d5d43a6216a",
      src: "https://analytics.notes.nayanpatel.net/umami.js",
    },
    clarity: {
      ID: "9hfzg8mbot",
    },
    metadatas: [
      {
          name: 'og:image',
          content: 'https://meta-image.vercel.app/Digital%20Support%20Services%20Notes!.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fnotes.nayanpatel.net%2Fsitelogo.svg&widths=250&heights=250'
      },
      {
          name: 'theme-color',
          content: '#5fa0ff'
      },
      {
          name: 'twitter:card',
          content: 'summary'
      },
  ],
    algolia: {
      appId: 'T2T780TWHU',
      apiKey: '99a14a43d86b4d0cb8f8608e65b3edaf',
      indexName: 'notes-nayanpatel',
      contextualSearch: true,
    },
    announcementBar: {
      id: 'beta', // Any value that will identify this message.
      content:
        "😲 wo hoo ! 🙏",
      backgroundColor: '#fafbfc', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
      isCloseable: true, // Defaults to `true`.
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      // title: 'zhang shitao',
      hideOnScroll: false,
      logo: {
        // alt: 'zhang shitao',
        src: '/logo.ico',
      },
      items: [
        {
          label: 'Home',
          to: '/',
          activeBaseRegex: '(^/docs)',
        },
        //需要自定义
        //下拉菜单标签
        {
          type: 'dropdown',
          label: 'Notes',
          position: 'left',
          items: [
            {
              label: '嵌入式札记',
              to: '/Embedded/About-Embedded',
              activeBasePath: '/Embedded',
            },
            {
              label: '容器技术',
              to: '/cloudnative/About-cloud-native',
              activeBasePath: '/cloudnative',
            },
            {
              label: '边缘计算',
              to: '/edgecomputing/About-edgecomputing',
              activeBasePath: '/edgecomputing',
            },
            {
              label: '神经网络',
              to: '/Neural-Net/About-Neural-Net',
              activeBasePath: '/Neural-Net',
            },
            {
              label: '小芝士',
              to: '/tips/About-tips',
              activeBasePath: '/tips',
            },
            // {
            //   label: 'Tools',
            //   to: '/tools/About-tools',
            //   activeBasePath: '/tools',
          ],
        },
        // {
        //   type: 'dropdown',
        //   label: 'Tools',
        //   position: 'left',
        //   items: [
        //     {
        //       label: 'Backdrop Icons',
        //       to: '/backdropicons',
        //       activeBasePath: '/backdropicons',
        //     },
        //     {
        //       label:  'Analytics',
        //       to: 'https://analytics.notes.nayanpatel.net/share/NmRzIAly/Digital%20Support%20Notes',
        //     },
        //   ],
        // },
        // {
        //   to: '/feature-requests',
        //   label: 'Feature Request →',
        //   position: 'left',
        //   className: 'feature-req',
        // },
        // {
        //   href: '#',
        //   position: 'right',
        //   label: "What's new?",
        //   'data': 'data-canny-changelog',
        //   'data-canny-changelog': 'true',
        // },
        {
          href: 'https://github.com/zhangtag',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        // {
        //   href: 'https://www.producthunt.com/posts/digital-support-notes',
        //   position: 'right',
        //   className: 'header-prod-link',
        //   'aria-label': 'GitHub repository',
        // },
      ],
    },
    hideableSidebar: true,
    prism: {
      additionalLanguages: [
        'dart',
        'ruby',
        'groovy',
        'kotlin',
        'java',
        'swift',
        'objectivec',
      ],
      theme: require('prism-react-renderer/themes/vsDark'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs/main',
          id: 'default',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars/sidebars-docs.js'),
          sidebarCollapsible: false,
          ...pageOptions,
        },
        blog: false,
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-umami',
      {
      },
    ],
    [
      'docusaurus-plugin-clarity',
      {
      },
    ],
    require('./src/featureRequests/FeatureRequestsPlugin'),
    tailwindPlugin,
    webpackPlugin,
    [
      'docusaurus-plugin-sass',
      {
      },
    ],
    //需要自定义
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs/Embedded',
        routeBasePath: 'Embedded',
        id: 'Embedded',
        sidebarPath: require.resolve('./sidebars/autogen.js'),
        ...pageOptions,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs/cloudnative',
        routeBasePath: 'cloudnative',
        id: 'cloudnative',
        sidebarPath: require.resolve('./sidebars/autogen.js'),
        ...pageOptions,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs/edgecomputing',
        routeBasePath: 'edgecomputing',
        id: 'edgecomputing',
        sidebarPath: require.resolve('./sidebars/autogen.js'),
        ...pageOptions,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs/Neural-Net',
        routeBasePath: 'Neural-Net',
        id: 'Neural-Net',
        sidebarPath: require.resolve('./sidebars/autogen.js'),
        ...pageOptions,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs/tips',
        routeBasePath: 'tips',
        id: 'tips',
        sidebarPath: require.resolve('./sidebars/autogen.js'),
        ...pageOptions,
      },
    ],
  // [
  //   '@docusaurus/plugin-content-docs',
  //   {
  //     path: 'docs/tools',
  //     routeBasePath: 'tools',
  //     id: 'tools',
  //     sidebarPath: require.resolve('./sidebars/autogen.js'),
  //     ...pageOptions,
  //   },
  // ],
],
};
