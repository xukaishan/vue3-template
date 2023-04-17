<script setup>
import { QzDrawer } from 'qz-ui';
import { useVModel } from '@vueuse/core';
import { useSystemStore } from 'store/modules/system';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: () => false,
    },
});
const emit = defineEmits(['update:modelValue']);
defineOptions({
    name: 'DrawerSetting',
});

const value = useVModel(props, 'modelValue', emit);
const systemStore = useSystemStore();
const { t } = inject('useLocale');

const confirm = () => {
    value.value = false;
};
</script>

<template>
    <qz-drawer v-model="value" class="ks-drawer-setting">
        <template #header>
            <div>{{ t('setting') }}</div>
        </template>
        <template #default>
            <div class="ks-drawer-setting-wrapper">
                i am drawer
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="value = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" @click="confirm">{{ t('confirm') }}</el-button>
            </div>
        </template>
    </qz-drawer>
</template>

<style lang="scss">
.ks-drawer-setting-wrapper {
}
</style>
