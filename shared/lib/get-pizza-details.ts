import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {calcTotalPizzaPrice} from "@/shared/lib/calc-total-pizza-price";
import {Ingradient, ProductItem} from "@prisma/client";

export const getPizzaDetails = (
    type:PizzaType,
    size:PizzaSize,
    items: ProductItem[],
    ingredients:Ingradient[],
    selectedIngredients:Set<number>
) => {
    const textDetails = `${size} см; ${mapPizzaType[type]} тесто`;
    const totalPrice = calcTotalPizzaPrice(type,size,items,ingredients,selectedIngredients);

    return {totalPrice, textDetails}
}