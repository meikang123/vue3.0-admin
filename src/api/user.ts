import { defHttp } from '@/utils/http';
import { RequestEnum } from '@/utils/http/types';

/*
* 用户登录
* */
export function goLogin(data: User.LoginParams) {
  console.log(data);
  return defHttp.request<User.LoginResultData>({
    url: '/user/login',
    method: RequestEnum.POST,
    data
  });
}
