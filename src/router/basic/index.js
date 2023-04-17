const Layout = () => import('layout/Index.vue');

export const syncRoutes = [
    {
        name: 'Portal',
        path: '/portal',
        component: () => import('views/portal/Index.vue'),
        meta: {
            title: '项目门户',
        },
    },
    {
        name: 'About',
        path: '/about',
        redirect: '/about/index',
        meta: {
            title: '关于',
        },
        children: [
            {
                name: 'AboutIndex',
                path: '/about/index',
                component: () => import('views/about/Index.vue'),
                meta: {
                    title: '关于首页',
                },
            },
            {
                name: 'AboutUs',
                path: '/about/aboutus',
                component: () => import('views/about/AboutUs.vue'),
                meta: {
                    title: '关于我们',
                },
            },
        ],
    },
    {
        name: 'Content',
        path: '/content/:id',
        component: () => import('views/content/Index.vue'),
        meta: {
            title: '页面',
        },
    },
];

export const basicRoutes = [
    {
        name: 'Login',
        path: '/login',
        component: () => import('views/login/Index.vue'),
        isHidden: true,
        meta: {
            title: '登录页',
        },
    },
    {
        name: 'Layout',
        path: '/',
        redirect: '/portal',
        component: Layout,
        meta: {
            title: '项目门户',
        },
        children: [
            ...syncRoutes,
        ],
    },
    {
        name: '404',
        path: '/404',
        component: () => import('layout/404.vue'),
        isHidden: true,
    },
    {
        name: '',
        path: '/:cathchAll(.*)',
        redirect: '/404',
        isHidden: true,
    },
];
