import { defineStore } from 'pinia';
import { useTitle } from '@vueuse/core';
import { basicRoutes } from 'router/basic';
import { recursive, LoadingSvg, RSAEncrypt, getQueryParams } from 'utils';
import { ElLoading, ElMessage } from 'qz-ui';
import { Locale, getLangPkg } from 'locale';
import { router } from 'router';
import apis from 'mocks';

export function genMenuByRoutes(routes = []) {
    const showRoutes = routes.filter(route => !route.isHidden);
    const res = showRoutes.map(route => {
        const menu = {
            id: route.path,
            label: route.meta.title,
            children: genMenuByRoutes(route.children || []),
        };
        return menu;
    });
    return res;
}

export const useSystemStore = defineStore('system', {
    state() {
        return {
            /* 当前语言包 */
            currentLangPkg: {},
            /* 用户设置 */
            userSetting: {
                themes: Storage.persistent.get('themes') || 'lims-default',
                scrollbarStyle: 'scrollbar-thin', // scrollbar-lims, scrollbar-thin
            },
            /* 用户信息 */
            userInfo: Storage.persistent.get('userInfo') || {},
            /* 菜单 */
            menus: [],
            /* 当前菜单id */
            currentMenuId: Storage.session.get('currentMenuId') || '',
            /* 页面标题 */
            title: useTitle('vue3-template'),
        };
    },
    getters: {
        routes() {
            return basicRoutes;
        },
        menusList(state) {
            return state.menus;
        },
    },
    actions: {
        setTheme(val) {
            this.userSetting.themes = val;
            Storage.persistent.set('themes', val);
        },
        setUserSetting(key, val) {
            this.userSetting[key] = val;
            Storage.persistent.set(`userSetting.${key}`, val);
        },
        setTitle(val) {
            this.title = val;
        },
        setUserInfo(val) {
            this.userInfo = val ?? {};
            Storage.persistent.set('userInfo', this.userInfo);
        },
        setCurrentMenuId(val) {
            this.currentMenuId = val;
            Storage.session.set('currentMenuId', val);
        },
        async getMenus() {
            // this.menus = await apis.getMenu();
            this.menus = genMenuByRoutes(this.routes);
            const home = this.menus.find(it => it.menu_type === 'home') || this.menus[0] || {};
            this.setCurrentMenuId(this.currentMenuId || home.id);
        },
        /* 设置全局loading */
        setGlobalLoading(flag, options) {
            if (flag === false && this.loading) {
                this.loading.close();
                return this.loading;
            }
            this.loading = ElLoading.service(Object.assign({
                target: document.body,
                lock: true,
                spinner: LoadingSvg,
                customClass: 'qz-global-loading',
                text: '系统正在加载中, 请稍后...',
                background: 'rgba(255, 255, 255, .8)',
            }, options));
            return this.loading;
        },
        /* 账号登录 */
        authLogin(payload) {
            const params = {
                username: payload.userName,
                password: (payload.password),
                // password: RSAEncrypt(payload.password),
            };
            this.setUserInfo({ 'qzToken': '8be9706a5af846cba6bcc7859f8e9fa8' });
            router.push({ path: '/' });
        },
        /* 退出登录 */
        loginOut() {
            return new Promise((resolve, reject) => {
                this.setUserInfo({});
                const { protocol, hostname, port, pathname } = window.location;
                window.location.href = `${protocol}//${hostname}:${port}${pathname}#/login`;
                resolve();
            });
        },
        /* 获取国际化 */
        async fetchLanguage({ language = unref(Locale.currentLang) } = {}) {
            const pkg = await getLangPkg(language);
            this.currentLangPkg = pkg;
            Locale.merge(language, { ...pkg.local });
        },
    },
});
