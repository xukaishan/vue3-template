import { useSystemStore } from 'store/modules/system';

const whiteList = ['/login', '/404']; // 路由白名单（不需要登录）

/* 路由拦截 */
export function createRouterIntercept(router) {
    router.beforeEach(async (to, from) => {
        const systemStore = useSystemStore();
        const flag = systemStore.userInfo.qzToken;

        const goLogin = () => {
            systemStore.loginOut();
            return {
                path: '/login',
                query: Object.assign({}, to.query),
                replace: true,
            };
        };

        const afterHandle = async () => {
            if (systemStore.menusList.length === 0) {
                await systemStore.getMenus();
            }

            systemStore.setCurrentMenuId(to.params.id || systemStore.currentMenuId);
        };

        if (whiteList.includes(to.path)) { // 路由白名单直接跳转
            return;
        }

        if (!flag) { // 未登录放到登录页面
            return goLogin();
        } else {
            await afterHandle();
        }
    });
    router.beforeResolve((to, from) => {

    });
    router.afterEach((to, from) => {

    });
}