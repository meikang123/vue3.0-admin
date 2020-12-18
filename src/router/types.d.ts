import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';

export interface RouteMeta {
  title?: string;
  getTitle?: (to: RouteLocationNormalized) => string;
  ignoreAuth?: boolean;
  position?: number;
  icon?: string;
  roles?: number[];
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<string, any>;
  fullPath?: string;
  hidden?: boolean;
}

export type AppRouteModule = AppRouteRecordRaw;
