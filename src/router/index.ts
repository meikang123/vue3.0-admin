import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { createGuard } from './guard';

import { basicRoutes } from './routes';
import { scrollBehavior } from './scrollBehavior';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior
});

/*
* 重置路由
* */
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name, meta: { ignoreAuth } } = route;
    if (name && !ignoreAuth) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App) {
  app.use(router);
  createGuard(router); // 路由守卫
}

export default router;
