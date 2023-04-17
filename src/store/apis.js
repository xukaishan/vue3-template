import QzService from '@/api';
const options = { headers: { 'Content-Type': 'application/json' } };

const apis = new QzService({
    /** 通过菜单id获取页面json */
    getJsonByMenuId: {
        url: 'ksr-prj/pageConf/getJson',
        method: 'post',
    },
    /** 获取菜单 */
    getMenu: {
        url: 'ksr-prj/menu/tree',
        method: 'post',
    },
    /* 获取国际化 */
    getLanguage: {
        url: 'ksr-prj/system/language',
        method: 'post',
    },
    /* 登录 */
    userLogin: {
        url: 'ksr-prj/noToken/user/userLogin',
        method: 'post',
    },
}, '');

export default apis;