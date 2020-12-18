import { isObject } from './is';

/*
* 数据深层合并
* */
export function deepMerge<T = any>(src: any, target: any): T {
  Object.entries(target).forEach(([key, item]) => {
    src[key] = isObject(item) ? deepMerge(item, target[key]) : (src[key] = target[key]);
  });
  return src;
}
