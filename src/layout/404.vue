<script setup>
import { QzNotFound } from 'qz-ui';
defineOptions({
    name: '404',
});
const router = useRouter();
const back = () => {
    router.go(-1);
};
</script>

<template>
   <div class="qz-404-page">
       <qz-not-found @back="back" />
   </div>
</template>

<style scoped lang="scss">

</style>
