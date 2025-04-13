import {useEffect, useState} from "react";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {useSet} from "react-use";
import {getAvailablePizzaSizes} from "@/shared/lib";
import {ProductItem} from "@prisma/client";
import {Variant} from "@/components/shared/Variants";

interface ReturnProps{
    size:PizzaSize;
    type:PizzaType;
    selectedIngredients:Set<number>;
    availablePizzaSizes:Variant[];
    currentItemId:number | undefined;
    setSize:(size:PizzaSize) => void;
    setType:(type:PizzaType) => void;
    addIngredient:(id:number) => void;
}

export const usePizzaOptions = (
    items: ProductItem[],
):ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

    const availablePizzaSizes =getAvailablePizzaSizes(type,items);

    const currentItemId  = items.find(item=>item.pizzaType === type && item.size===size)?.id;

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes.find(item => Number(item.value) === size && !item.disabled);
        const availableSize = availablePizzaSizes?.find(item => !item.disabled);
        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize)
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availablePizzaSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient,
    }

}