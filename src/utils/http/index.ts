import type { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config';
import { deepMerge } from '@/utils';
import { VAxios, errorResult } from './Axios';
import { AxiosTransform, CreateAxiosOptions, RequestOptions, Result, ResultEnum, RequestEnum } from './types';

const env: any = process.env.VUE_APP_ENV;
const baseUrl = config[env].requestUrl;

const ErrorSystemMessage = '系统错误、请稍后尝试！';

/*
* 请求钩子函数
* */
const transform: AxiosTransform = {
  /*
  * 数据处理--接口错误
  * */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult, errorMessageMode } = options;
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data;
    }
    // 错误的时候返回

    const { data: $data } = res;
    if (!$data) {
      return errorResult;
    }

    // 服务器返回接口格式
    const { code, data, msg } = $data;
    const hasSuccess = $data && Reflect.has($data, 'code') && code === ResultEnum.SUCCESS;
    if (!hasSuccess) {
      if (msg) {
        // options.errorMessageMode --根据类型处理信息
        if (errorMessageMode === 'message') {
          ElMessage.error(msg || ErrorSystemMessage);
        }
      }
      Promise.reject(new Error(msg));
      return errorResult;
    }

    // 接口请求成功
    if (code === ResultEnum.SUCCESS) {
      return data;
    }

    // 超时
    if (code === ResultEnum.TIMEOUT) {
      Promise.reject(new Error('超时'));
      return errorResult;
    }
    return errorResult;
  },

  /*
  * 请求之前处理config
  * */
  beforeRequestHook: (config, options) => {
    // options可以定义额外config数据处理规则
    const { ignoreCancelToken } = options;
    if (ignoreCancelToken) {
      config.headers = { ...config.headers, ignoreCancelToken };
    }

    if (config.method?.toUpperCase() === RequestEnum.GET) { // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      const now = new Date().getTime();
      const isString: boolean = toString.call(config.params) === '[object String]';
      if (!isString) {
        config.data = {
          params: Object.assign(config.params || {}, {
            _t: now
          })
        };
      } else {
        // 兼容restful风格
        config.url = `${config.url + config.params}?_t=${now}`;
        config.params = undefined;
      }
    }
    return config;
  },

  /*
  * 请求拦截器处理
  * */
  requestInterceptors: config => config,

  /*
  * 请求错误
  * */
  requestInterceptorsCatch: (error: any) => Promise.reject(error),

  /*
  * 响应错误处理--系统错误
  * */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {};
    const msg: string = response?.data?.error ? response.data.error.message : '';
    const err: string = error?.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        // 错误处理
      }
      if (err?.includes('Network Error')) {
        // 错误处理
      }
    } catch (error) {
      throw new Error(error);
    }
    const status = error?.response?.status;
    switch (status) {
      case 400:
        // 400 错误提示
        console.log(msg);
        break;

      case 500:
        console.log('-----------500');
        break;

      default:
    }
    return Promise.reject(error);
  }
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(deepMerge({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 30 * 1000,
    transform,
    requestOptions: {
      isTransformRequestResult: true,
      errorMessageMode: 'message'
    }
  }, opt || {}));
}

export const defHttp = createAxios();
