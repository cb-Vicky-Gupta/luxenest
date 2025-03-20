export interface User {
  name: string;
  id: number;
  email: string;
  image?: string;
  roleId: number;
}

export interface Role {
  id: number;
  name: string;
}

export interface LoginUserData {
  name: string;
  id: number;
  email: string;
  image?: string;
  roleId: Role;
}

export interface LoginResponse {
  msg: string;
  data: LoginUserData;
  token: string;
  status: number;
}