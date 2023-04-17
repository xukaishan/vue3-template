import { Suspense, Transition, TransitionGroup, Teleport } from 'vue';
import { ElButton } from 'qz-ui'; // 导入 element-plus 组件

/* 组件库组件 */
const qzComps = {
    QzInput: () => import('qz-ui/dist/packages/es/QzInput'), // 异步导入组件库中的组件
    QzResizeDialog: () => import('qz-ui/dist/packages/es/QzResizeDialog'),
};
/* 本地组件 */
const ksAsyncComp = {
};

/* 异步组件 */
const asyncComp = {
    ...qzComps,
    ...ksAsyncComp,
};
/* 同步组件 */
const syncComp = {
    Suspense,
    Transition,
    TransitionGroup,
    Teleport,
    ElButton,
};

export function setupComp(app, components = { asyncComp, syncComp }) {
    /* 注册异步 */
    Object.entries(components.asyncComp).forEach(([name, component]) => {
        app.component(name, defineAsyncComponent(component));
    });
    /* 注册同步 */
    Object.entries(components.syncComp).forEach(([name, component]) => {
        app.component(name, component);
    });
}