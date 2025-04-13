'use client'

import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/components/shared/Title";
import {Button} from "@/components/ui/button";
import {PizzaImage} from "@/components/shared/PizzaImage";
import Variants from "@/components/shared/Variants";
import {PizzaSize, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import IngredientItem from "@/components/shared/IngredientItem";
import {Ingradient, ProductItem} from "@prisma/client";
import {getPizzaDetails} from "@/shared/lib";
import {usePizzaOptions} from "@/shared/hooks";

interface Props {
    imageUrl: string;
    name: string;
    loading?: boolean;
    ingredients: Ingradient[];
    items: ProductItem[];
    onSubmit: (itemId: number, ingradients: number[]) => void;
    className?: string;
}

const ChoosePizzaForm: FC<Props> = ({
                                        imageUrl,
                                        name,
                                        loading,
                                        ingredients,
                                        items,
                                        onSubmit,
                                        className
                                    }) => {

    const {
        size,
        type,
        setType,
        setSize,
        currentItemId,
        availablePizzaSizes,
        addIngredient,
        selectedIngredients
    } = usePizzaOptions(items);
    const {textDetails, totalPrice} = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

    const handleClickAdd = () => {
        if (currentItemId)
            onSubmit(currentItemId, Array.from(selectedIngredients));
    }

    return (
        <div className={cn('flex flex-1', className)}>
            <div className={'flex flex-1 justify-center items-center relative'}>
                <PizzaImage imageUrl={imageUrl} size={size}/>
            </div>
            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold mb-1'}/>
                <p className={'text-gray-400'}>{textDetails}</p>
                <div className={'flex flex-col gap-5 mt-5'}>
                    <Variants items={availablePizzaSizes}
                              selectedValue={String(size)}
                              onClick={value => setSize(Number(value) as PizzaSize)}/>
                    <Variants items={pizzaTypes}
                              selectedValue={String(type)}
                              onClick={value => setType(Number(value) as PizzaType)}/>
                </div>
                <div className={'bg-gray-50 p-5 rounded-md h-[380px] overflow-auto scrollbar mt-5'}>
                    <div className={'grid grid-cols-3 gap-3'}>
                        {
                            ingredients.map(ingredient => (
                                <IngredientItem
                                    key={`modal-ingredient-${ingredient.id}`}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    imageUrl={ingredient.imageUrl}
                                    active={selectedIngredients.has(ingredient.id)}
                                    onClick={() => addIngredient(ingredient.id)}/>
                            ))
                        }
                    </div>
                </div>

                <Button
                    loading={loading}
                    className={'h-[55px] px-10 text-base w-full mt-10 rounded-[18px]'}
                    onClick={handleClickAdd}
                >
                    Добавить в корзину ${totalPrice}
                </Button>

            </div>

        </div>
    );
};

export default ChoosePizzaForm;
