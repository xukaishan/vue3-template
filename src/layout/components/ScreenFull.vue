<script setup>
import { ElIcon } from 'qz-ui';
import { FullScreen } from '@element-plus/icons-vue';
import { useFullscreen } from '@vueuse/core';

defineOptions({
    name: 'ScreenFull',
});
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <div
    class="screen-full"
    @click="toggle"
  >
    <el-icon><full-screen /></el-icon>
  </div>
</template>

<style scoped lang="scss">
    .screen-full{
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 10px;
        color: var(--ks-reverse-color);
    }
</style>
