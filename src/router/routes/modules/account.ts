import type { AppRouteModule } from '@/router/types.d';
import Layout from '@/layout/index.vue';

export default [{
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: { title: '账户管理', icon: 'user', roles: [1] },
  children: [{
    path: 'index',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
    name: 'UserIndex',
    meta: { title: '账户管理', roles: [1] }
  }]
}] as AppRouteModule[];
