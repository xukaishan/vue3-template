<script setup>
import { useSystemStore } from 'store/modules/system';
import { QzMenu } from 'qz-ui/dist/packages/es/QzMenu';

defineOptions({
    name: 'HomeAside',
});
const systemStore = useSystemStore();
const router = useRouter();

const menuOpts = computed(() => {
    return systemStore.menusList;
});
const cpCheckedId = computed({
    get() {
        return systemStore.currentMenuId;
    },
    set() {},
});

const property = ref({
    bgColor: 'var(--ks-menu-bg-color)',
    hoverBgColor: 'var(--ks-menu-hover-bg-color)',
    showStyle: '', // default
    list: menuOpts,
});

const onMenuSelect = async (it, index, idx) => {
    if (it.id === systemStore.currentMenuId) {
        return false;
    }
    systemStore.setCurrentMenuId(it.id);
    router.push({ path: it.id });
};
</script>

<template>
    <div class="layout-aside">
        <qz-menu v-model:checkedId="cpCheckedId" v-bind="property" @on-menu-select="onMenuSelect" />
    </div>
</template>
