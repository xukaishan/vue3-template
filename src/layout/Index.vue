<script setup>
import { ElContainer } from 'qz-ui';
import HomeAside from './components/HomeAside.vue';
import HomeHeader from './components/HomeHeader.vue';
import HomeMain from './components/HomeMain.vue';
import { useSystemStore } from 'store/modules/system';

defineOptions({
    name: 'Layout',
});
const systemStore = useSystemStore();
await systemStore.fetchLanguage();
</script>

<template>
    <el-container class="layout-home">
        <home-aside></home-aside>
        <el-container class="layout-wrapper">
            <home-header></home-header>
            <home-main></home-main>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.layout-home {
    height: 100vh;
    width: 100%;
    .layout-aside {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
    }
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        .layout-header {
            height: 60px;
            padding: 0 50px;
            display: flex;
            flex: 1;
            align-items: center;
            box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
            ::v-deep(.toolbar){
                display: flex;
                justify-content: flex-end;
                min-width: 260px;
                margin-left: auto;
                height: 100%;
            }
        }
        .layout-main {
            width: 100%;
            height: 100vh;
            overflow-x: hidden;
            padding: 0px;
        }
    }
}
</style>
