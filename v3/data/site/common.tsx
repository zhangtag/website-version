import { SiteDataType, DockItem,Techbadge } from '@site/src/types';
import React from 'react';
import GithubAlt from '@ricons/fa/GithubAlt';
import Mail from '@ricons/ionicons5/Mail';
import Zhihu from '@ricons/antd/ZhihuOutlined';
import Wechat from '@ricons/antd/WechatFilled';
import QQ from '@ricons/antd/QqOutlined';
import BiliBili from '@site/static/images/icons/bilibili.svg';
import Juejin from '@site/static/images/icons/juejin.svg';
import Feishu from '@site/static/images/icons/feishu.svg';
import Gitea from '@site/static/images/icons/gitea.svg';
import { openDockModal } from '@site/src/utils';
import { TipItem } from '@site/src/components/tip';

// export const badges: Techbadge[] = [];

export const siteData: SiteDataType = {
    owner: {
        name: 'zhang',
        avatar: '/custom/m8.ico',
        signature: '不积小流，何以汇江海',
    },
    // beian: {
    //     prefix: '浙ICP备',
    //     code: '1801341号 - 6',
    // },
};

//顶部通知栏
export const tips: TipItem[] = [
    {
        id: 'update',
        content:
            '船新版本',
        color: 'warning',
        pages: ['blog'],
        center: true,
        closeTime: 3600 * 24,
    },
    // {
    //     id: 'buy',
    //     content: 'Rowfish主题(本站主题)开始售卖,欢迎尝鲜哦！<a href="/docs/rowfish/">立即购买</a>',
    //     pages: ['blog'],
    //     color: 'success',
    //     closeTime: 3600 * 24,
    //     center: true,
    //     closeable: false,
    // },
];

export const dockItems: DockItem[] = [
    {
        name: 'github',
        href: 'https://github.com/pincman',
        icon: GithubAlt,
        target: '_blank',
    },
    {
        name: 'B站',
        href: 'https://space.bilibili.com/53679018',
        icon: () => <BiliBili className="arco-icon" />,
        target: '_blank',
    },
    {
        name: '邮箱',
        href: 'mailto:pincman@qq.com',
        icon: Mail,
    },
];


