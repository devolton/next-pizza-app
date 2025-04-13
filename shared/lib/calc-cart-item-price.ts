import {CartItemDTO} from "@/shared/services/dto/cart.dto";

export const calcCartItemPrice = (item: CartItemDTO): number => {

    const ingredientsPrice = item.ingradients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;


}