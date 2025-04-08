import { makeApiRequest } from "../functions"
import * as urls from '@/apis/urls/index'
export const authLogin = async(data: any)=>{
    return await makeApiRequest("POST", urls.API_URLS.LOGIN, data,  )
}
export const authRegister = async(data: any)=>{
    return await makeApiRequest("POST", urls.API_URLS.REGISTER, data,  )
}

