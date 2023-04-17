<script setup>
import { Check } from '@element-plus/icons-vue';
import { ElMenu, ElSubMenu, ElMenuItem, ElAvatar, ElIcon } from 'qz-ui';
import { useThemes } from 'hooks';
import { useLocale, Locale } from 'locale';
import { useSystemStore } from 'store/modules/system';
import DrawerSetting from './DrawerSetting.vue';

defineOptions({
    name: 'UserSetting',
});
const visible = ref(false);

const systemStore = useSystemStore();
const setting = [
    {
        id: 'personal-document',
        label: '个人档案',
    },
    {
        id: 'modify-password',
        label: '修改密码',
    },
    {
        id: 'setting',
        label: '设置',
    },
    {
        id: 'themes',
        label: '主题',
        children: [
            /* lims */
            {
                id: 'lims-default',
                label: '默认',
                pId: 'themes',
            },
            {
                id: 'dark',
                label: '暗夜黑',
                pId: 'themes',
            },
            {
                id: 'lims-classic-green',
                label: '经典绿',
                pId: 'themes',
            },
            {
                id: 'lims-dark-green',
                label: '暗黑绿',
                pId: 'themes',
            },
            /* 其他 */
            {
                id: 'bule',
                label: '禅道蓝',
                pId: 'themes',
            },
            {
                id: 'green',
                label: '叶兰绿',
                pId: 'themes',
            },
            {
                id: 'red',
                label: '赤诚红',
                pId: 'themes',
            },
            {
                id: 'purple',
                label: '玉烟紫',
                pId: 'themes',
            },
            {
                id: 'black',
                label: '露莓黑',
                pId: 'themes',
            },
            {
                id: 'classic-bule',
                label: '经典蓝',
                pId: 'themes',
            },
        ],
    },
    {
        id: 'language',
        label: '语言',
        children: [
            {
                id: 'zh-CN',
                label: '简体',
            },
            {
                id: 'en-US',
                label: 'English',
            },
        ],
    },
    {
        id: 'login-out',
        label: '退出',
    },
];
const { themes } = useThemes();
const { t, setLang, currentLang } = useLocale('userSetting.');
const curSetting = computed(() => {
    return [themes.value, currentLang.value];
});
const handleSelect = (index, indexPath) => {
    if (indexPath.includes('themes')) {
        themes.value = index;
    } else if (indexPath.includes('language')) {
        Locale.currentLang.value = index;
        systemStore.fetchLanguage({ language: index }).then(flag => {
            flag && setLang(index);
        });
    } else if (indexPath.includes('login-out')) {
        systemStore.loginOut();
    } else if (indexPath.includes('setting')) {
        visible.value = true;
    }
};
</script>

<template>
    <div class="user-setting">
        <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
            <el-sub-menu index="1" popper-class="header-menu-setting-custom">
                <template #title>Admin</template>
                <el-menu-item index="user-info" class="user-info">
                    <div class="user-info-wrapper">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                        <div class="text-info">
                            <span>{{ 'Admin' }}</span>
                            <span>{{ '超级管理员' }}</span>
                        </div>
                    </div>
                </el-menu-item>
                <template v-for="(it, idx) in setting" :key="idx">
                    <el-sub-menu v-if="it.children && it.children.length > 0" :index="`${it.id}`">
                        <template #title>{{ t(it.id) }}</template>
                        <el-menu-item v-for="(sub, i) in it.children" :key="`${idx}-${i}`" :index="`${sub.id}`">
                            {{ t(sub.id) }}
                            <el-icon v-if="curSetting.includes(sub.id)">
                                <check />
                            </el-icon>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="`${it.id}`">{{ t(it.id) }}</el-menu-item>
                </template>
            </el-sub-menu>
        </el-menu>
    </div>
    <drawer-setting v-model="visible" />
</template>

<style scoped lang="scss">
.user-setting {
}
</style>

<style lang="scss">
.header-menu-setting-custom.el-popper {
    .user-info {
        height: 60px !important;
        display: flex;
        align-items: center;
        .user-info-wrapper {
            width: 100%;
            height: 60px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .text-info {
                flex: 1;
                padding-left: 10px;
                height: 60px;
                display: flex;
                flex-direction: column;
                span {
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }
}
</style>
