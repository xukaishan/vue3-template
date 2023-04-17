/* 正则校验 */
import { isHasTrueValue } from 'utils';

/* 内置的默认规则 */
export const defaultValidator = {
    idCard: {
        validator: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        error: '请输入正确的证件号码',
    },
    phone: {
        validator: /^1[345789]\d{9}$/,
        error: '请输入11位手机号码',
    },
    tel: {
        validator: /(^0\d{2,3}-\d{7,8}$)|(^\d{7,8}$)|(^0\d{10,11}$)/,
        error: '请输入正确的座机号',
    },
    phoneAndTel: {
        validator: /(^0\d{2,3}-\d{7,8}$)|(^\d{7,8}$)|(^0\d{10,11}$)|(^1[345789]\d{9}$)/,
        error: '联系方式格式异常',
    },
    email: {
        validator: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        error: '请输入正确的邮箱号码',
    },
    number: {
        validator: /(^[1-9]([0-9]*)$|^[0-9]$)/,
        error: '请输入正整数',
    },
    validCode: {
        validator: /(^[0-9]{3}$)|(^[0-9]{6}$)/,
        error: '请输入正确的邮编号码',
    },
};

export function genReg(regStr) {
    return new RegExp(regStr);
}
/* 解析正则 */
export function executeReg(value = '', validator) {
    if (!isHasTrueValue(validator)) {
        return false;
    }
    const reg = genReg(validator);
    const res = value.match(reg);
    if (res && res[0] === res.input) {
        return true;
    }
    return false;
}
