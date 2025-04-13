import {CartDTO} from "@/shared/services/dto/cart.dto";
import {calcCartItemPrice} from "@/shared/lib/calc-cart-item-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    disabled: boolean;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingradients?: Array<{ name: string; price: number }>

}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails  = (data: CartDTO) :ReturnProps=> {
    const items:CartStateItem[] = data.items.map((item)=>({
        id:item.id,
        quantity:item.quantity,
        name:item.productItem.product.name,
        imageUrl:item.productItem.product.imageUrl,
        disabled:false,
        price: calcCartItemPrice(item),
        pizzaSize:item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingradients:item.ingradients.map(ingredint => ({
            name:ingredint.name,
            price:ingredint.price
        }))


    })) as CartStateItem[];


    return {
        items,
        totalAmount:data.totalAmount

    }


}