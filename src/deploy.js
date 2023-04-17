(function (global) {
    const config = {
        env: (function () {
            return import.meta.env.VITE_APP_ENV;
        })(),
    };
    /* 接口地址 */
    let apiBaseUrl = '';
    /* 登录地址 */
    const loginUrl = '';

    const { protocol, hostname, port, pathname: pName } = window.location;
    const pathname = pName.replace('/runtime', '');

    if (config.env !== 'localDevelopment') {
        apiBaseUrl = `${protocol}//${hostname}:${port}${pathname}`;
    }

    // 获取wsHost
    function getWsHost() {
        const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
        if (apiBaseUrl) {
            return protocol + apiBaseUrl.replace('https:', '').replace('http:', '');
        } else {
            return protocol + '//' + window.location.host + port + pathname;
        }
    }

    global.qzSystemConfig = {
        appCode: 'your app name',
        env: config.env,
        loginUrl,
        apiBaseUrl,
        wsHost: getWsHost(),
        buildTime: import.meta.env.VITE_BUILD_TIME,
    };
})(window);
