import {Ingradient} from "@prisma/client";
import {axiosInstance} from "@/shared/services/instance";
import {ApiRoutes} from "@/shared/services/constants";

export const getAll = async (): Promise<Ingradient[]> => {
    return (await axiosInstance.get<Ingradient[]>(ApiRoutes.INGREDIENTS)).data;
}