import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { USER_INFO_KEY, TOKEN_KEY } from '@/config/enum';
import { goLogin } from '@/api/user';
import store from '../index';

export type UserInfo = Omit<User.UserBaseInfo, 'roles'>

/*
* 权限列表--可接服务器返回
* */
const defaultRole = [{
  id: 1,
  name: '超级管理源'
}];

/*
* 获取信息
* */
function getCache<T>(key: string) {
  let d: T;
  const data: any = window.localStorage.getItem(key) || '';
  try {
    d = JSON.parse(data);
  } catch (e) {
    d = data;
  }
  return d;
}

/*
* 设置信息
* */
function setCache(key: string, data: any) {
  if (!data) return;
  window.localStorage.setItem(key, JSON.stringify(data));
}

/*
* 删除登录信息
* */
const delCache = (key: string) => {
  window.localStorage.removeItem(key);
};

@Module({ namespaced: true, name: 'user', dynamic: true, store })
class User extends VuexModule {
  private userInfoState: UserInfo | null = null;

  // token--预留cookie改token
  private tokenState = '';

  // defaultRoleState
  private defaultRoleState: User.RoleInfo[] = defaultRole;

  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }

  get getDefaultRoleState(): User.RoleInfo[] {
    return this.defaultRoleState;
  }

  get getTokenState(): string {
    return this.tokenState || getCache<string>(TOKEN_KEY);
  }

  get getRoleListState(): User.RoleInfo[] {
    return this.userInfoState && this.userInfoState.role ? [this.userInfoState.role] : [];
  }

  @Mutation
  commitResetState(): void {
    delCache(USER_INFO_KEY);
    delCache(TOKEN_KEY);
    this.userInfoState = null;
    this.tokenState = '';
  }

  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info;
    setCache(USER_INFO_KEY, info);
  }

  @Mutation
  commitTokenState(token: string): void {
    this.tokenState = token;
    setCache(TOKEN_KEY, token);
  }

  @Action
  async login(data: User.LoginParams): Promise<User.UserBaseInfo | null> {
    try {
      const res = await goLogin(data);
      const { id, real_name, role_id } = res;
      const d = defaultRole.find(item => item.id === role_id) || { name: '未知权限' };
      const info: User.UserBaseInfo = {
        id,
        name: real_name,
        role: {
          id: role_id,
          name: d.name
        }
      };
      this.commitUserInfoState(info);
      this.commitTokenState(`${real_name}-${role_id}`);
      return info;
    } catch (e) {
      return null;
    }
  }
}

export const userStore = getModule<User>(User);
