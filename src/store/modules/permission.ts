import { toRaw } from 'vue';
import type { AppRouteRecordRaw } from '@/router/types.d';
import { VuexModule, Mutation, Module, getModule, Action } from 'vuex-module-decorators';

import { asyncRoutes } from '@/router/routes';

import store from '@/store';
import { userStore } from './user';

function filter<T = any>(tree: T[], func: (n: T) => boolean): T[] {
  function listFilter(list: T[]) {
    return list.map((node: any) => ({ ...node })).filter(node => {
      node.children = node.children && listFilter(node.children);
      return func(node) || (node.children && node.children.length);
    });
  }
  return listFilter(tree);
}

@Module({ dynamic: true, namespaced: true, store, name: 'permission' })
class Permission extends VuexModule {
  // 是否动态加过路由
  private isDynamicAddedRouteState = false;

  private lastBuildMenuTimeState = 0;

  private menuListState: AppRouteRecordRaw[] = [];

  get getMenuListState() {
    return this.menuListState;
  }

  get getLastBuildMenuTimeState() {
    return this.lastBuildMenuTimeState;
  }

  get getIsDynamicAddedRouteState() {
    return this.isDynamicAddedRouteState;
  }

  @Mutation
  commitMenuListState(list: AppRouteRecordRaw[]): void {
    this.menuListState = list;
  }

  @Mutation
  commitLastBuildMenuTimeState(): void {
    this.lastBuildMenuTimeState = new Date().getTime();
  }

  @Mutation
  commitDynamicAddedRouteState(added: boolean): void {
    this.isDynamicAddedRouteState = added;
  }

  @Mutation
  commitResetState(): void {
    this.isDynamicAddedRouteState = false;
    this.menuListState = [];
    this.lastBuildMenuTimeState = 0;
  }

  @Action
  async buildRoutesAction(id?: number | string): Promise<AppRouteRecordRaw[]> {
    let routes: AppRouteRecordRaw[] = [];
    const roleList = toRaw(userStore.getRoleListState);
    routes = filter(asyncRoutes, route => {
      const { meta } = route;
      const { roles } = meta || {};
      if (!roles) return true;
      return roleList.some(role => roles.includes(role.id));
    });
    console.log(routes);
    this.commitMenuListState(routes);
    return routes;
  }
}

export const permissionStore = getModule<Permission>(Permission);
