import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './basic';
import { createRouterIntercept } from './intercept';

export const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [],
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app) {
    basicRoutes.forEach((route) => {
        !router.hasRoute(route.name) && router.addRoute(route);
    });
    app.use(router);
    createRouterIntercept(router);
}
