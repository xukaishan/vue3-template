<script setup>
import { QzForm } from 'qz-ui/dist/packages/es/QzForm';
import { QzFormItem } from 'qz-ui/dist/packages/es/QzFormItem';
import { User, Unlock, CircleClose } from '@element-plus/icons-vue';
import { useSystemStore } from 'store/modules/system';

const systemStore = useSystemStore();

const title = '管理系统';
// const src = ref('https://192.168.2.223:21700/files/formal/normal_file/202202/422789433664.png');
const src = ref('https://192.168.2.230:20800/files/formal/loginPageVideo/two-in-one.mp4');
const isVideo = computed(() => src.value.endsWith('.mp4'));
const logoSrc = 'https://192.168.2.223:24700/files/formal/normal_file/202212/1284721418168.png';
const copyrightSrc = 'https://192.168.2.223:21700/files/formal/normal_file/202004/597537852120.png';
const model = ref({
    userName: '',
    password: '',
});
const onSubmit = () => {
    systemStore.authLogin(model.value);
};
</script>

<template>
    <div class="ks-login">
        <div class="ks-login-background">
            <video v-if="isVideo" autoplay loop muted class="ks-login-bg-element video">
                <source :src="src" type="video/mp4" />
            </video>
            <img v-else class="ks-login-bg-element img" :src="src" />
        </div>
        <div class="ks-login-wrapper">
            <div class="ks-login-header">
                <div v-if="logoSrc" class="ks-login-img-wrapper ks-flex-center">
                    <img :src="logoSrc" />
                </div>
                <div class="ks-login-title">{{ title }}</div>
            </div>
            <div class="ks-login-form-wrapper">
                <qz-form class="ks-login-form" @keydown.enter.prevent="onSubmit">
                    <qz-form-item class="ks-login-form-item">
                        <qz-input v-model="model.userName" :prefix-icon="User" placeholder="用户账号" class="ks-login-input" clearable />
                    </qz-form-item>
                    <qz-form-item class="ks-login-form-item">
                        <qz-input
                            v-model="model.password"
                            :prefix-icon="Unlock"
                            placeholder="输入密码"
                            class="ks-login-input ks-login-password"
                            type="password"
                            show-password
                            :clearable="true"
                        />
                    </qz-form-item>
                    <qz-form-item class="ks-login-form-item">
                        <el-button class="ks-login-submit" @click="onSubmit">登录</el-button>
                    </qz-form-item>
                </qz-form>
            </div>
            <div v-if="copyrightSrc" class="ks-login-footer ks-flex-center">
                <div class="ks-login-copyright-text">技术支持:</div>
                <img :src="copyrightSrc" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$ks-login-input-height: 50px;
.ks-login {
    position: relative;
    width: 100vw;
    height: 100vh;
    .ks-login-background {
        width: 100%;
        height: 100%;
        font-size: 0;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        .ks-login-bg-element {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .ks-login-wrapper {
        position: absolute;
        right: 38px;
        min-width: 400px;
        height: 100%;
        text-align: center;
        background: #fff;
        padding: 0 45px;
        display: flex;
        flex-direction: column;
        .ks-login-header {
            padding-top: 80px;
            .ks-login-img-wrapper {
                height: 64px;
                img {
                    height: 100%;
                }
            }
            .ks-login-title {
                font-size: 18px;
                font-weight: 400;
                line-height: 34px;
                color: #595959;
            }
        }
        .ks-login-form-wrapper {
            .ks-login-form {
                display: flex;
                flex-direction: column;
                .ks-login-form-item {
                    margin: 22px 0 0;
                    .ks-login-input {
                        height: $ks-login-input-height;
                        font-size: 14px;
                        color: #8c8c8c;
                        ::v-deep(.el-input__wrapper) {
                            border-radius: calc($ks-login-input-height / 2);
                            .el-icon {
                                font-size: 18px;
                                color: var(--el-input-icon-color);
                                cursor: pointer;
                            }
                        }
                    }
                    .ks-login-submit {
                        height: $ks-login-input-height;
                        width: 100%;
                        border-radius: calc($ks-login-input-height / 2);
                        font-size: 16px;
                    }
                }
            }
        }
        .ks-login-footer {
            margin-top: auto;
            height: 32px;
            margin-bottom: 20px;
            color: #8c8c8c;
            .ks-login-copyright-text {
                margin-right: 6px;
            }
            img {
                height: 100%;
            }
        }
    }
}
</style>
