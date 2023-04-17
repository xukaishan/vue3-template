import { defineStore } from 'pinia';
import { useStyleTag } from '@vueuse/core';

const style = {
    /* tabs 选项卡相关 */
    '--ks-tabs-bg-color': {
        value: ref('#ffffff'),
        label: 'tabs详情背景色',
        group: 'tabs',
        compType: 'input',
        slot: 'color-picker',
    },
    /* form 表单相关 */
    '--ks-form-text-color': {
        value: ref('#333333'),
        label: '表单字体颜色',
        group: 'form',
        compType: 'input',
        slot: 'color-picker',
    },
    '--ks-form-label-color': {
        value: ref('#666666'),
        label: '表单标签颜色',
        group: 'form',
        compType: 'input',
        slot: 'color-picker',
    },
    '--ks-form-label-weight': {
        value: ref('normal'),
        label: '表单标签加粗',
        group: 'form',
        compType: 'select',
        slot: '',
        options: [
            {
                label: 'normal',
                value: 'normal',
            },
            {
                label: 100,
                value: 100,
            },
            {
                label: 300,
                value: 300,
            },
            {
                label: 500,
                value: 500,
            },
            {
                label: 700,
                value: 700,
            },
            {
                label: 900,
                value: 900,
            },
            {
                label: 1000,
                value: 1000,
            },
        ],
    },
    /* table 表格相关 */
};

/* 动态样式 用于某些样式需要动态的修改 应用于的全局所有组件 如所有表单，所有表格，以及其他全局使用的需要动态修改的变量
注(性能优化)： 其他不需要动态修改的变量推荐直接在 variables.scss文件中定义
*/
export const useStyleStore = defineStore('style', () => {
    const root = style;

    const cssContentText = (root) => `
        :root{
            --ks-tabs-bg-color: ${root['--ks-tabs-bg-color'].value.value};
            --ks-form-text-color: ${root['--ks-form-text-color'].value.value};
            --ks-form-label-color: ${root['--ks-form-label-color'].value.value};
            --ks-form-label-weight: ${root['--ks-form-label-weight'].value.value};
        }
    `;

    const { id, css, load, unload, isLoaded } = useStyleTag(cssContentText(root), { id: 'ks-custom-style-tag-id', manual: true });

    const getCssVar = (name = '') => {
        return root[name]?.value;
    };

    const setCssVar = (name = '', val) => {
        const cssRef = root[name]?.value;
        if (cssRef) {
            cssRef.value = val;
            css.value = cssContentText(root);
        }
    };

    const setCssVars = (payload) => {
        Object.keys(payload || {}).forEach(key => {
            const cssRef = root[key]?.value;
            if (cssRef) {
                cssRef.value = payload[key];
            }
        });
        css.value = cssContentText(root);
    };

    return {
        root,
        getCssVar,
        setCssVar,
        setCssVars,
        load,
        unload,
        css,
    };
});
