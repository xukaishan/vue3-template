<script setup>
import { ElMain } from 'qz-ui';
import { useSystemStore } from 'store/modules/system';
defineOptions({
    name: 'HomeMain',
});
const systemStore = useSystemStore();
</script>

<template>
    <el-main class="layout-main">
        <router-view v-slot="{ Component }">
            <transition name="el-zoom-in-top" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </el-main>
</template>
