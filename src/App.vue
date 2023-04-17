<script setup>
import { ElConfigProvider } from 'qz-ui';
import { useLocale } from 'locale';
import { useSystemStore } from 'store/modules/system';
const systemStore = useSystemStore();
provide('useLocale', useLocale());

const cpLang = computed(() => {
    return systemStore.currentLangPkg.plus?.default ?? {};
});
</script>

<template>
    <el-config-provider :locale="cpLang">
            <router-view v-slot="{ Component }">
                <Suspense>
                    <div>
                        <component :is="Component" />
                    </div>
                </Suspense>
            </router-view>
    </el-config-provider>
</template>
