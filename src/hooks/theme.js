/*
 * @Description: 主题控制
 * @Author: xuks
 * @Date: 2022-09-14 15:10:25
 * @LastEditTime: 2023-03-20 16:05:14
 */
import { useSystemStore } from 'store/modules/system';

export function useThemes() {
    const systemStore = useSystemStore();
    const themes = ref(systemStore.userSetting.themes);
    watch(() => themes.value, (theme, old) => {
        document.documentElement.classList.remove(old);
        document.documentElement.classList.add(theme);
        systemStore.setTheme(theme);
    });
    onMounted(() => {
        document.documentElement.classList.add(themes.value);
    });

    return { themes };
}

export function useScrollbarStyle() {
    const systemStore = useSystemStore();
    const scrollbarStyle = ref(systemStore.userSetting.scrollbarStyle);
    watch(() => scrollbarStyle.value, (val, old) => {
        document.documentElement.classList.remove(old);
        document.documentElement.classList.add(val);
        systemStore.setUserSetting('scrollbarStyle', val);
    });
    onMounted(() => {
        document.documentElement.classList.add(scrollbarStyle.value);
    });

    return { scrollbarStyle };
}