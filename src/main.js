import './deploy.js';
import 'plugins/storage';
import { createApp } from 'vue';
import { setupRouter } from 'router/index.js';
import { setupStore } from 'store/index.js';
import 'styles/reset.scss';
import 'qz-ui/dist/styles/themes/default.scss';
import 'styles/themes/default.scss';
import App from './App.vue';

import { setupComp } from 'components/compImport';

function setupApp() {
    const app = createApp(App);
    /* 初始化组件 */
    setupComp(app);
    /* 初始化store */
    setupStore(app);
    /* 初始化router */
    setupRouter(app);

    app.config.warnHandler = (msg, instance, trace) => {
        console.error(msg, instance, trace);
    };

    app.mount('#app');
    console.log('app=>', app);
}

setupApp();
