import {axiosInstance} from "@/shared/services/instance";

export const getMe=async()=>{
    const {data} = await axiosInstance.get("/auth/me");
    return data;
}