import { isObject, isString, isFunction, isDate, isArray, isRegExp, isNumber } from './type';
import { pbk, prk } from './token';
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js';

export const deepMerge = (target, newObj) => {
    Object.keys(newObj).forEach((key) => {
        const targetValue = target[key];
        const newObjValue = newObj[key];
        if (isObject(targetValue) && isObject(newObjValue)) {
            deepMerge(targetValue, newObjValue);
        } else {
            target[key] = newObjValue;
        }
    });
    return target;
};

export function getPropByPath(obj, keyPath) {
    try {
        return keyPath.split('.').reduce((pre, cur) => pre[cur], obj);
    } catch (error) {
        return '';
    }
};

export function str2Arr(str = '', separator = ',') {
    if (isObject(str)) return [];
    return `${unref(str)}`.split(separator);
}

export function arr2Str(arr = [], separator = ',') {
    if (isObject(arr)) return '';
    if (isString(arr)) return arr;
    return unref(arr).join(separator);
}
/**
 * @description: 数组转为树形结构
 * @param {*} list 待转换的数组
 * @param {*} opts 字段映射
 * @return {} res 结果树形结构
 */
export function listToTree(list = [], opts = {}) {
    const res = [];
    const { childrenKey, pIdKey, idKey } = Object.assign({ idKey: 'id', childrenKey: 'children', pIdKey: 'pId' }, opts);
    const mapObj = list.reduce((pre, cur) => (pre[cur[idKey]] = cur, pre), {});
    for (const item of list) {
        if (!item[pIdKey] || `${item[pIdKey]}` === '0') {
            res.push(item);
            continue;
        }
        if (item[pIdKey] in mapObj) {
            const parent = mapObj[item[pIdKey]];
            parent[childrenKey] = parent[childrenKey] || [];
            parent[childrenKey].push(item);
        }
    }
    return res;
}
/**
 * @description: 数组去重
 * @param {*} arr
 * @return {*} 去重后的数组
 */
export function unique(arr) {
    if (!Array.isArray(arr)) {
        throw new Error(`args[0] required Array, but got ${typeof arr}`);
    }
    return Array.from(new Set(arr));
}

/**
 * @description: 日期格式化
 * @param {*} fmt 格式化类型：YY-MM-DD HH:mm:ss, YY/MM/DD HH:mm, YY.MM.DD 等
 * @exp dateFormat(new Date(), 'YY-MM-DD HH:mm:ss') 2022-08-01 11:19:26
 * @exp dateFormat(new Date(), 'YY/MM/DD HH:mm') 2022/08/01 11:19
 * @return {*} 格式化后的日期字符
 */
export function dateFormat(date, fmt = 'YY-MM-DD') {
    let ret;
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'D+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString(), // 秒
    };
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
        };
    };
    return fmt;
};

/**
 * @description: 安全地调用函数
 * @return {*}
 */

export function tryCall(fn, ctx, ...args) {
    if (isFunction(fn)) {
        return fn.call(ctx, ...args);
    } else {
        console.error(`${fn} is not a function`);
    }
}

/**
 * @description: 递归树级结构
 * @return {*} Array
 */

export function recursive(arr = [], func) {
    if (arr.length === 0) {
        return arr;
    }
    arr.forEach(it => {
        if (it.children && it.children.length) {
            recursive(it.children, func);
        }
        isFunction(func) && (it = func(it));
    });
    return arr;
}

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const getRegExp = re => {
    let flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
};
export const clone = parent => {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];

    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;

        if (isArray(parent)) {
            // 对数组做特殊处理
            child = [];
        } else if (isRegExp(parent)) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (isDate(parent)) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else { // 函数不做处理
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index !== -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);

        for (const i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };
    return _clone(parent);
};
/**
 * @description: 包装一个函数 传递多余的参数
 * @param {*} onEvents 原事件对象： ex: { onClick: (a, b) => {} }
 * @param {*} custom 自定义参数
 * @return {*} { onClick: (custom, a, b) => {} }
 */
export const wrapperEvents = (onEvents, custom) => {
    return Object.entries((onEvents || {})).reduce((pre, [name, originMethod]) => {
        pre[name] = (...args) => originMethod(custom, ...args);
        return pre;
    }, {});
};

export const rAF = window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
        window.setTimeout(callback, 17);
    };
/**
 * @description: 延迟执行函数
 * @param {*} cb
 * @param {*} time
 * @return {*}
 */
export function delay(cb, time) {
    if (!isNumber(time) || time === 0) {
        cb();
        return;
    }
    setTimeout(cb, time);
}

const { hasOwnProperty } = Object.prototype;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

/**
 * @description: 随机id
 * @param {*} n
 * @return {*}
 */
export function randomId (n = 32) {
    let s = '';
    Array.from({ length: n }).forEach((v, i) => {
        const r = Math.floor(Math.random() * 36);
        if (r < 10) {
            s += r;
        } else {
            s += String.fromCharCode(r + 87);
        }
        if ([7, 11, 15, 19].includes(i)) s += '-';
    });
    return s;
}
/**
 * @description: 创建不同类型的日志打印 用于区分
 * @param {*} type
 * @return {*}
 */
function createLogger (type = 'transparent') {
    const style = `font-size:20px;color:#fff;background-color:${type}`;
    const flag = window.qzSystemConfig.env === 'localDevelopment' || Storage.session.get('debugger') === 'CdpxkLTipJKXyA848';

    return function (...args) {
        if (!flag) return;
        if (type === 'log') {
            console.log(...args);
        } else {
            const [first, ...rest] = args;
            console.log(`%c${first}`, style, ...rest);
        }
    };
}

export const logger = {
    red: createLogger('red'),
    log: createLogger('log'),
    green: createLogger('green'), // 事件流
    purple: createLogger('purple'), // 条件
    black: createLogger('black'),
};

/**
 * @description: 获取字符查询参数 包括search 和 hash参数
 * @param {string} params // input: http://localhost:4399/?name=zs#/content/1296392148384?qz=456&jk=777; output: { qz: '456', jk: '777', name: 'zs' }
 * @return {object}
 */
export function getQueryParams(params = '') {
    const getPara = (str = '') => {
        const urlStr = str.split('?')[1];
        const obj = {};
        if (!urlStr) return obj;
        const paramsArr = urlStr.split('&');
        for (let i = 0, len = paramsArr.length; i < len; i++) {
            const arr = paramsArr[i].split('=');
            obj[arr[0]] = arr[1];
        }
        return obj;
    };
    const [searchParams, hashParams] = params.split('#');
    return Object.assign(hashParams && { ...getPara(hashParams) } || {}, getPara(searchParams));
}

export function RSAEncrypt (string) {
    const jse = new JSEncrypt();
    jse.setPublicKey(pbk);
    return jse.encrypt(string);
}

export function RSADecrypt (string) {
    const jse = new JSEncrypt();
    jse.setPrivateKey(prk);
    return jse.decrypt(string);
}