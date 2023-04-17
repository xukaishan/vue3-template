<script setup>
import { Setting } from '@element-plus/icons-vue';
import { ElHeader } from 'qz-ui';
import ScreenFull from './ScreenFull.vue';
import UserSetting from './UserSetting.vue';

defineOptions({
    name: 'HomeHeader',
});
</script>

<template>
    <el-header class="layout-header">
        <div class="toolbar">
            <screen-full></screen-full>
            <user-setting></user-setting>
        </div>
    </el-header>
</template>
