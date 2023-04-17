import { createPinia } from 'pinia';

export * from 'store/modules/common';
export * from 'store/modules/style';
export * from 'store/modules/system';

export function setupStore(app) {
    app.use(createPinia());
}