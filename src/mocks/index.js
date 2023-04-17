import QzService from 'api';
const options = { headers: { 'Content-Type': 'application/json' } };

// const apis = new QzService({
//     getMenu: {
//         url: '/api/mock/getMenu',
//         method: 'post',
//         options,
//     },
// });

const data = [
    {
        id: '0',
        label: '检测样品',
        children: [
            {
                id: '0-1',
                label: '检测业务报检',
                children: [
                    {
                        id: '0-1-1',
                        label: '外部报检',
                        children: [
                            {
                                id: '0-1-1-1',
                                label: '报检子菜单测试菜单',
                            },
                            {
                                id: '0-1-1-2',
                                label: '报检',
                            },
                        ],
                    },
                    {
                        id: '0-1-2',
                        label: '报检业务评审',
                    },
                ],
            },
            {
                id: '0-2',
                label: '检测任务分析',
                children: [
                    {
                        id: '0-2-1',
                        label: '样品分析',
                    },
                    {
                        id: '0-2-2',
                        label: '数据审核',
                    },
                ],
            },
        ],
    },
    {
        id: '1',
        label: '业务',
        icon: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/759e2aa805c0461b840e0f0f09ed05fa~tplv-k3u1fbpfcp-zoom-1.image?',
        children: [
            {
                id: '1-1',
                label: '业务检测业务报检',
                children: [
                    {
                        id: '1-1-1',
                        label: '业务报告',
                    },
                    {
                        id: '1-1-2',
                        label: '业务评审',
                    },
                    {
                        id: '1-1-3',
                        label: '业务项目',
                    },
                    {
                        id: '1-1-4',
                        label: '业务打印',
                    },
                    {
                        id: '1-1-5',
                        label: '业务修改',
                    },
                ],
            },
            {
                id: '1-2',
                label: '检测任务分析',
                children: [
                    {
                        id: '1-2-1',
                        label: '样品分析',
                    },
                    {
                        id: '1-2-2',
                        label: '数据审核',
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        label: '系统管理',
        position: 'bottom',
        icon: 'https://192.168.2.215:31800/tu-prj/cu/cuicons/loadImage?iconNo=M40260',
        children: [
            {
                id: '2-1',
                label: '系统设置',
                children: [
                    {
                        id: '2-1-1',
                        label: '系统设置样式',
                    },
                    {
                        id: '2-1-2',
                        label: '系统设置颜色',
                    },
                ],
            },
            {
                id: '0-2',
                label: '系统模板管理',
                children: [
                    {
                        id: '2-2-1',
                        label: '系统模板创建',
                    },
                    {
                        id: '2-2-2',
                        label: '系统模板修改',
                    },
                ],
            },
        ],
    },
];

/* 模拟接口 */
function mock(params) {
    return new Promise((resolve, reject) => {
        const rad = Math.floor(Math.random() * 1000);
        setTimeout(() => {
            resolve(params);
        }, rad);
    });
}
/* 菜单 */
export function getMenu() {
    return mock(data);
}

const apis = {
    getMenu,
};

export default apis;