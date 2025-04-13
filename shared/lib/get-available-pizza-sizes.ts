import {pizzaSizes, PizzaType} from "@/shared/constants/pizza";
import {ProductItem} from "@prisma/client";
import {Variant} from "@/components/shared/Variants";



export const getAvailablePizzaSizes = (type:PizzaType,items:ProductItem[]):Variant[] => {
    const filteredPizzasByType = items.filter(item => item.pizzaType === type);
    return  pizzaSizes.map(size => ({
        name: size.name,
        value: size.value,
        disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(size.value))

    }))


}