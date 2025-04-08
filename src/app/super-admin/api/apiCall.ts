import { makeApiRequest } from "@/apis/functions"
import * as urls from '@/app/super-admin/api/urls'
import * as common from '@/apis/urls/index'
//category
export const addCategory = async(data: any)=>{
    return await makeApiRequest("POST", urls.ADD_CATEGORY, data,  )
}
export const updateCategory = async(data: any,id:number)=>{
    return await makeApiRequest("POST", urls.UPDATE_CATEGORY+{id}, data,  )
}
export const deleteCategory = async(data: any,id:number)=>{
    return await makeApiRequest("POST", urls.DELETE_CATEGORY+{id}, data,  )
}
export const getCategory = async(data: any)=>{
    return await makeApiRequest("POST", common.API_URLS.GET_CATEGORY, data,  )
}
export const getCategoryById = async(data: any,id:number)=>{
    return await makeApiRequest("POST", common.API_URLS.GET_CATEGORY_BY_ID, data,  )
}
//sub-category
export const addSubCategory = async(data: any)=>{
    return await makeApiRequest("POST", urls.ADD_SUB_CATEGORY, data,  )
}
export const updateSubCategory = async(data: any, id:number)=>{
    return await makeApiRequest("POST", urls.UPDATE_SUB_CATEGORY+{id}, data,  )
}
export const deleteSubCategory = async(data: any, id:number)=>{
    return await makeApiRequest("POST", urls.DELETE_SUB_CATEGORY+{id}, data,  )
}
export const getSubCategory = async(data: any)=>{
    return await makeApiRequest("POST", common.API_URLS.GET_SUB_CATEGORY, data,  )
}
export const getSubCategoryById = async(data: any,id:number)=>{
    return await makeApiRequest("POST", common.API_URLS.GET_SUB_CATEGORY_BY_ID+{id}, data,  )
}
//products

//sellers

//users

//settings
