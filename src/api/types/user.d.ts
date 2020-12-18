namespace User {
  export interface LoginParams {
    name: string;
    password: string;
  }

  export interface LoginResultData {
    id: number;
    real_name: string;
    role_id: number;
  }

  export interface RoleInfo {
    id: number;
    name: string;
  }

  export interface UserBaseInfo {
    id?: number;
    name: string;
    role: RoleInfo;
  }
}
