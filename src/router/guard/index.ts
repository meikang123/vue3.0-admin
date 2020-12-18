import { RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import config from '@/config';
import { AxiosCanceler } from '@/utils/http/axiosCancel';

import { userStore } from '@/store/modules/user';
import { permissionStore } from '@/store/modules/permission';

const { body } = document;

const isHash = (href: string) => /^#/.test(href);

const { title: appTitle, removeAllHttpPending } = config;

export function createGuard(router: Router) {
  NProgress.configure({ showSpinner: false });

  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }

  router.beforeEach(async (to, from) => {
    NProgress.start();

    try {
      removeAllHttpPending && axiosCanceler?.removeAllPending();
    } catch (error) {
      console.warn(`路由守卫跳转失败${error}`);
    }

    // 需要验证权限
    const token = userStore.getTokenState;
    if (!token) { // 未登录
      const { ignoreAuth } = to.meta;
      if (ignoreAuth) {
        return true;
      }

      const redirectData: { path: string; replace: boolean; query?: { [key: string]: string } } = {
        path: config.login,
        replace: true
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        };
      }
      return redirectData;
    }

    if (permissionStore.getIsDynamicAddedRouteState) {
      return true;
    }

    const routes = await permissionStore.buildRoutesAction();
    routes.forEach(route => {
      router.addRoute(route as RouteRecordRaw);
    });

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    permissionStore.commitDynamicAddedRouteState(true);
    return nextData;
  });

  router.afterEach(to => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    NProgress.done();

    // 设置页面标题, tagView标题
    const { getTitle } = to.meta;
    let { title } = to.meta;
    if (getTitle) {
      title = to.meta.getTitle(to);
    }

    if (title) {
      document.title = `${appTitle} - ${title}`;
    } else {
      document.title = appTitle;
    }

    if (to.path === config.login) { // 清除记录
      userStore.commitResetState();
    }
  });
}
