import Axios from './lib/axios';
import { useSystemStore } from 'store/modules/system';
import { ElLoading, ElMessageBox } from 'qz-ui';
import { Locale } from 'locale';

const defaultOpts = {
    timeout: 10000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
};
const instance = Axios.create(defaultOpts);

const getUserInfo = function () {
    const systemStore = useSystemStore();
    return systemStore.userInfo;
};

export const lock = {
    lockTips: false,
};

function streamType(config) {
    return ['blob', 'arraybuffer'].includes(config.responseType);
}

// 请求拦截器
instance.interceptors.request.use(
    config => {
        if (!config.headers) {
            config.headers = defaultOpts.headers;
        }
        const systemStore = useSystemStore();
        config.headers['qz-token'] = systemStore.userInfo.qzToken;
        config.headers['language'] = unref(Locale.currentLang);
        if (window.qzSystemConfig && window.qzSystemConfig.apiBaseUrl) {
            config.baseURL = window.qzSystemConfig.apiBaseUrl;
        }
        return config;
    },
    error => {
        return Promise.error(error);
    },
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 304) {
            console.log('response=>', response);
            if (response.data.code === '403002') {
                const systemStore = useSystemStore();
                if (!lock.lockTips) {
                    lock.lockTips = true;
                    ElMessageBox.confirm(
                        response.data.msg || '登录失效，请重新登录！',
                        '提示',
                        {
                            confirmButtonText: '确认',
                            type: 'warning',
                        },
                    ).then(action => {
                        systemStore.loginOut().then(_ => {
                            lock.lockTips = false;
                        });
                    }).catch(_ => {});
                }
            }

            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        const response = { status: -404, statusText: '本地网络错误' };
        return Promise.reject(error.response || response);
    },
);

/**
 * 响应format
 * @param response
 * @param format
 * @returns
 */
function responseFormat(response, format = false) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304)) {
        if (format && (response.data.errcode || response.data.code)) {
            return {
                errcode: response.data.errcode || responseCodeFormat(response.data.code),
                errmsg: response.data.errmsg || response.data.msg,
                data: response.data.data,
            };
        } else {
            if (streamType(response.config)) { // 流类型直接返回
                return response;
            }
            return response.data;
        }
    }

    // 异常状态下，保持格式统一
    return {
        errcode: response.status,
        errmsg: '请检查网络或稍后重试(' + response.status + ')',
        statusText: response.statusText,
        data: response.data,
    };
}

function responseCodeFormat(code) {
    // 代表成功的code todo
    return code;
}

export async function get(url, params, options = {}) {
    const send = {
        timeout: options.timeout || instance.defaults.timeout,
        method: 'get',
        url,
        params,
        headers: options.headers,
        CancelToken: new Axios.CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return responseFormat(response, true);
        },
    );
}

export async function post(url, data, options = {}) {
    const send = {
        timeout: options.timeout || instance.defaults.timeout,
        method: 'post',
        url,
        data,
        headers: options.headers,
        CancelToken: new Axios.CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return responseFormat(response, true);
        },
    );
}

export async function upload(url, formData, options = {}) {
    const send = {
        timeout: options.timeout || 30000,
        method: 'post',
        url,
        data: formData,
        headers: Object.assign({}, options.headers, { 'Content-Type': 'multipart/form-data' }),
        // `onUploadProgress` 允许为上传处理进度事件
        onUploadProgress: function (progressEvent) {
            typeof options.onUploadProgress === 'function' && options.onUploadProgress(progressEvent);
        },
        CancelToken: new Axios.CancelToken(function executor(c) {
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
    };
    return instance(send).then(
        (response) => {
            return responseFormat(response);
        },
    );
}

export default instance;
