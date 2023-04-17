import { isHasTrueValue, isObject, isDefined } from './type';

export function normalizeUnDefined (val, def = '') {
    if ((!isDefined(val) || val === 'null' || val === 'undefined') && val !== 0) {
        return def;
    }
    return val;
}

/* 返回带有缓存功能的函数 */
export function cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

/**
 * @description: 转驼峰
 * @params {str} qz-button
 * @return qzButton
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached((str = '') => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

/**
 * @description: 横线转下划线
 * @params {str} qz-button Qz-Button
 * @return qz_button
 */
export const hyphenate2underline = cached((str = '') => {
    return str.replace(camelizeRE, '_$1').toLowerCase();
});

/**
 * @description: 大写开头
 * @param {str} qzButton
 * @return QzButton
 */
export const capitalize = cached((str = '') => {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * @description: 驼峰转横线
 * @params {str} qzButton
 * @return qz-button
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str = '') => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * @description: 统一处理组件名
 * @params {name} quotePage、QuotePage
 * @return {string} QzQuotePage
 */
export const normalizeResolveComponent = (name) => {
    const upperCaseName = capitalize(name);
    return resolveComponent(`Qz${upperCaseName}`);
};

/**
 * @description: 格式化类名相加 驼峰转横线
 * @ex input: normalizeClassName(KsPageWrapper, KsPage); output: ks-page-wrapper ks-page
 * @ex input: normalizeClassName({KsPageWrapper: true, KsPage: false}), output: ks-page-wrapper
 */
export function normalizeClassName(...args) {
    return args.reduce((pre, cur) => {
        if (isHasTrueValue(cur)) {
            if (isObject(cur)) {
                const c = Object.entries(cur).reduce((p, [key, val]) => {
                    if (val && key !== 'undefined') {
                        p += ` ${hyphenate(key)}`;
                    }
                    return p.trim();
                }, '');
                pre += ` ${hyphenate(c)}`;
            } else {
                pre += ` ${hyphenate(cur)}`;
            }
        }
        return pre.trim();
    }, '');
}
/**
 * @description: normalize 属性正常化 兼容配置态属性的类型 exp input: { disabled: '', clearable: true }
 * @param {*} attribute
 * @return {*} output: { disabled: false, clearable: true }
 */
export function normalizeAttribute(attribute = {}) {
    const booleanKeys = ['disabled', 'clearable', 'readonly', 'showPassword', 'showWordLimit'];
    const arrayKeys = ['options'];
    for (const key of Object.keys(attribute)) {
        if (booleanKeys.includes(key)) {
            attribute[key] = !!attribute[key];
            continue;
        }
        if (arrayKeys.includes(key)) {
            attribute[key] = isHasTrueValue(attribute[key]) ? attribute[key] : [];
            continue;
        }
    }
    return attribute;
}