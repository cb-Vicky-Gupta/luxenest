import { makeApiRequest } from "@/apis/functions";
import * as urls from "@/app/super-admin/api/urls";
import * as common from "@/apis/urls/index";
import { GetCategoryResponse } from "@/interface";
//super-admin
//category
export const addCategory = async (data: any) => {
  return await makeApiRequest("POST", urls.ADD_CATEGORY, data);
};
export const updateCategory = async (data: any, id: number) => {
  return await makeApiRequest("POST", urls.UPDATE_CATEGORY + { id }, data);
};
export const deleteCategory = async (data: any, id: number) => {
  return await makeApiRequest("POST", urls.DELETE_CATEGORY + { id }, data);
};
export const getCategory = async (
  search = "",
  page = 1,
  limit = 10
): Promise<GetCategoryResponse> => {
  const query = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });
  const url = `${common.API_URLS.GET_CATEGORY}?${query.toString()}`;
  return await makeApiRequest("GET", url);
};
export const getCategoryById = async (data: any, id: number) => {
  return await makeApiRequest("POST", common.API_URLS.GET_CATEGORY_BY_ID, data);
};
//sub-category
export const addSubCategory = async (data: any) => {
  return await makeApiRequest("POST", urls.ADD_SUB_CATEGORY, data);
};
export const updateSubCategory = async (data: any, id: number) => {
  return await makeApiRequest("POST", urls.UPDATE_SUB_CATEGORY + { id }, data);
};
export const deleteSubCategory = async (data: any, id: number) => {
  return await makeApiRequest("POST", urls.DELETE_SUB_CATEGORY + { id }, data);
};
export const getSubCategory = async () => {
  return await makeApiRequest("GET", common.API_URLS.GET_SUB_CATEGORY, );
};
export const getSubCategoryById = async (data: any, id: number) => {
  return await makeApiRequest(
    "POST",
    common.API_URLS.GET_SUB_CATEGORY_BY_ID + { id },
    data
  );
};
//users list for super admin
export const getUsersList = async (data: any) => {
  return await makeApiRequest("POST", urls.USERS_LIST, data);
};
//products

//sellers

//users

//settings
