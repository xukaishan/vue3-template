import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

process.env.VITE_BASE = '';

const alias = Object.entries({
    '@': resolve(__dirname, '../src'),
    assets: resolve(__dirname, '../src/assets'),
    api: resolve(__dirname, '../src/api'),
    locale: resolve(__dirname, '../src/locale'),
    common: resolve(__dirname, '../src/common'),
    components: resolve(__dirname, '../src/components'),
    layout: resolve(__dirname, '../src/layout'),
    router: resolve(__dirname, '../src/router'),
    hooks: resolve(__dirname, '../src/hooks'),
    store: resolve(__dirname, '../src/store'),
    plugins: resolve(__dirname, '../src/plugins'),
    styles: resolve(__dirname, '../src/styles'),
    utils: resolve(__dirname, '../src/utils'),
    views: resolve(__dirname, '../src/views'),
    mocks: resolve(__dirname, '../src/mocks'),
    /* 开发环境使用本地组件库包 在这里修改 你组件库所在的路径 */
    'qz-ui': 'D:\\work_new\\dev\\resources\\qz-ui-components',
}).map(([find, replacement]) => {
    return { find, replacement };
});

export default defineConfig({
    resolve: {
        alias: [
            ...alias,
            {
                find: 'vue$',
                replacement: 'vue/dist/vue.runtime.esm-bundler.js',
            },
            {
                find: '@vue/runtime-core',
                replacement: '@vue/runtime-core/dist/runtime-core.esm-bundler.js',
            },
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: '@use "../packages/styles/variables.scss" as *;',
            },
        },
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    plugins: [
        vue({
            include: [/\.vue$/],
        }),
        svgLoader(),
        DefineOptions(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue'],
            exclude: ['./node_modules/**'],
            cache: false,
        }),
        vueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            dirs: [
                resolve(__dirname, '../src/utils'),
            ],
        }),
    ],
});
