import {Ingradient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";

/**
 * Функция для подсчета общей стоемости пиццы
 *
 * @example calcTotalPizzaPrice(1,1,20,[],[],[])
 *
 * @param type - тип теста
 * @param size - размер выбраной пиццы
 * @param items - список вариаций
 * @param ingredients - список инградиентов
 * @param selectedIngredients - список выбраных инградиентов
 *
 * @return number - общая стоимость
 */

export const calcTotalPizzaPrice = (
    type:PizzaType,
    size:PizzaSize,
    items: ProductItem[],
    ingredients:Ingradient[],
    selectedIngredients:Set<number>
) => {
    const totalIngradientsPrice = ingredients.filter(ingradient => selectedIngredients.has(ingradient.id))
        ?.reduce((acc, ingradient) => acc + ingradient.price, 0);
    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;
    return pizzaPrice + totalIngradientsPrice;


}