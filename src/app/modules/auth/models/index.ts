import { ItemUser } from '@modules/user-role/user-manager/models';
import { ItemRole } from '@modules/user-role/role-manager/models';


export interface LoginRequest {
  userName: string,
  password: string,
}

export interface LoginResponsed {
  message: string,
  token: string,
  user: ItemUser,
  roles: { roleCode: string, roleName: string }[]
}



export interface ChangePasswordRequest{
  userName: string,
  password: string,
  oldPassword: string,
}







