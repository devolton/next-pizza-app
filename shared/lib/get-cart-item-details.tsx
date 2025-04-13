import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {CartStateItem} from "@/shared/lib/get-cart-details";

export const getCartItemDetails = (
    ingredients: CartStateItem['ingradients'],
    pizzaType: PizzaType ,
    pizzaSize: PizzaSize
): string => {
    const details: string[] = [];
    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
    }
    if (ingredients) {
        details.push(...ingredients.map(ingredient => ingredient.name));
    }
    return details.join(', ');
}