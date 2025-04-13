import {useSearchParams} from "next/navigation";

import React, {useMemo} from "react";
import {useSet} from "react-use";



interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes?: string;
    sizes?: string;
    ingredients?: string;
}
export interface Filters {
    pizzaTypes: Set<string>;
    sizes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}
interface ReturnFilterProps extends Filters {
    setPrice:(name: keyof PriceProps, value: number) => void;
    setPizzaTypes:(value: string) => void;
    setSizes:(value: string) => void;
    setIngredients:(value: string) => void;
}

export const useFilters = ():ReturnFilterProps => {
    console.log('useFilters')
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    //ingredients filter
    const [selectedIngredients, {toggle: setIngredients}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',') || []));

//prices filter
    const [prices, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });

//size filter
    const [sizes, {toggle: setSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));
    //pizza types filter
    const [pizzaTypes, {toggle: setPizzaTypes}] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

    //todo important
    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice(prev=>({
            ...prev,
            [name]: value,
        }))
    }



    return  useMemo(()=>({
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrice:updatePrice,
        setPizzaTypes,
        setSizes,
        setIngredients

    }),[sizes,pizzaTypes,selectedIngredients,prices])

}