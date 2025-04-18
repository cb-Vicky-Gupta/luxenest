import { JSX } from "react/jsx-runtime";

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

export interface ICategoryRow {
  sNo: number;
  categoryName: string;
  image: JSX.Element;
  actions: JSX.Element;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface GetCategoryResponse {
  data: CategoryType[];
}
