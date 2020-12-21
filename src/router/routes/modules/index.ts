import type { AppRouteModule } from '@/router/types.d';
import Layout from '@/layout/index.vue';

export default [{
  path: '/name',
  component: Layout,
  redirect: '/name/index',
  name: 'Name',
  meta: { title: '测试管理', icon: 'user', roles: [1] },
  children: [{
    path: 'index',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
    name: 'NameIndex',
    meta: { title: '账户管理', roles: [1] }
  }, {
    path: 'test',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
    name: 'NameTest',
    meta: { title: '用户管理', roles: [1] }
  }]
}] as AppRouteModule[];
