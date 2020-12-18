import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types.d';
import { configRoutesToRoutes } from '@/utils/router';

import Layout from '@/layout/index.vue';

const routeFiles = require.context('./modules', true, /\.js$/);
const routeModuleList: AppRouteModule[] = configRoutesToRoutes(routeFiles);

const errRoute: AppRouteModule[] = [{
  path: '/:path(.*)*',
  name: 'Error',
  redirect: '/404',
  hidden: true,
  meta: {
    ignoreAuth: true
  }
}];

export const asyncRoutes = [...errRoute, ...routeModuleList];

/*
* 基础路由 不用权限
* */
export const basicRoutes: AppRouteRecordRaw[] = [{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: 'default' */ '@/views/default/login/index.vue'),
  hidden: true,
  meta: {
    ignoreAuth: true
  }
}, {
  path: '/404',
  name: '404',
  component: () => import(/* webpackChunkName: 'default' */ '@/views/default/404'),
  hidden: true,
  meta: {
    ignoreAuth: true
  }
}, {
  path: '/icon',
  name: 'Icon',
  component: () => import(/* webpackChunkName: 'default' */ '@/views/default/icon'),
  hidden: true,
  meta: {
    ignoreAuth: true
  }
}, {
  path: '/',
  name: 'Root',
  redirect: 'Index',
  meta: {
    title: 'Root'
  }
}, {
  path: '/index',
  redirect: '/index/welcome',
  component: Layout,
  name: 'Index',
  meta: { },
  children: [{
    path: 'welcome',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: 'default' */ '@/views/default/index'),
    hidden: true,
    meta: { title: 'Welcome' }
  }]
}];
