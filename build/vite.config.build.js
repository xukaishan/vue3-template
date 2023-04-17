import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseCfg from './vite.base';
import babel from 'rollup-plugin-babel';
import legacyPlugin from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';

function getDateTime() {
    const d = new Date();
    let s = d.getFullYear();
    s += '' + ('0' + (d.getMonth() + 1)).substr(-2);
    s += '' + ('0' + d.getDate()).substr(-2);
    s += '' + ('0' + d.getHours()).substr(-2);
    s += '' + ('0' + d.getMinutes()).substr(-2);
    return s;
}

const openVisualizer = process.env.npm_lifecycle_event === 'build:r';

process.env.VITE_BASE = './';
process.env.VITE_BUILD_TIME = getDateTime();

function setAlias(resolve) {
    resolve.alias = resolve.alias.map(alia => {
        if (alia.find === 'qz-ui') {
            alia.replacement = '@kscommon/qz-ui'; // 生产模式使用线上包
        }
        return alia;
    });
    return resolve;
};

export default () => ({
    resolve: setAlias(baseCfg.resolve),
    css: baseCfg.css,
    extensions: baseCfg.extensions,
    plugins: [
        legacyPlugin({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // ie 11
        }),
        ...baseCfg.plugins,
    ],
    base: process.env.VITE_BASE,
    build: {
        target: 'es2015',
        rollupOptions: {
            // output: {
            //     manualChunks: id => {
            //         if (id.includes('node_modules')) {
            //             return id.toString().split('node_modules/')[1].split('/')[0].toString();
            //         }
            //     },
            // },
            external: [],
            plugins: [
                babel({
                    exclude: '**/node_modules/**',
                }),
                visualizer({
                    open: openVisualizer,
                    gzipSize: true,
                    brotliSize: true,
                }),
            ],
        },
        emptyOutDir: true,
    },
});
