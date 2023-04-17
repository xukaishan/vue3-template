import { loadEnv } from 'vite';
import baseCfg from './vite.base';

export default ({ command, mode }) => {
    const viteENV = loadEnv(mode, process.cwd());
    return {
        server: {
            proxy: {
                '/ksr-prj/noToken/user/userLogin': {
                    target: 'http://192.168.2.215:31942',
                    changeOrigin: true,
                    secure: false,
                },
                '/ksr-prj/noToken': {
                    target: 'http://192.168.4.110:5100',
                    // target: 'http://192.168.2.215:31988',
                    changeOrigin: true,
                    secure: false,
                    // rewrite: (path) => prePath + path,
                },
                '/ksr-prj': {
                    target: 'http://192.168.4.79:30002',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        resolve: baseCfg.resolve,
        css: baseCfg.css,
        extensions: baseCfg.extensions,
        plugins: baseCfg.plugins,
    };
};
