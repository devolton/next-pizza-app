import {axiosInstance} from "@/shared/services/instance";
import {CartDTO, CreateCartItemValues} from "@/shared/services/dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data;

}

export const updateItemQuantity = async (id:number,quantity:number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>(`/cart/${id}`, {quantity})).data;

}

export const removeCartItem = async (id:number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`/cart/${id}`)).data;
}
export const addCartItem = async (values:CreateCartItemValues):Promise<CartDTO>=>{
    return (await axiosInstance.post<CartDTO>(`/cart`, values)).data;
}