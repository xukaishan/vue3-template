import { Locale as QzLocale } from 'qz-ui/dist/packages/es/locale';
import { useLocale as QzUseLocale } from 'qz-ui/dist/packages/es/shared';

export const getLangPkg = (currentLang) => {
    const cur = unref(currentLang || QzLocale.currentLang);
    const map = {
        'zh-CN': () => [
            import('qz-ui/dist/packages/es/zh-cn.js'), // element-plus
            // import('qz-ui/dist/packages/es/qz-zh-CN.js'), // qz-ui
            import('./lang/zh-CN'), // 运行态
        ],
        'en-US': () => [
            import('qz-ui/dist/packages/es/en.js'), // element-plus
            // import('qz-ui/dist/packages/es/qz-en-US.js'), // qz-ui
            import('./lang/en-US'), // 运行态
        ],
    };

    return Promise.all(map[cur]?.()).then(res => {
        const [plus, local] = res;
        // eslint-disable-next-line new-cap
        return { plus: plus.default, local: new local.default() };
    });
};

export const Locale = QzLocale;

/**
 * @description: 使用国际化
 * @return {*} { t, setLang }: t国际化语言函数, setLang切换语言方法
 */
export const useLocale = QzUseLocale;

export default Locale;
