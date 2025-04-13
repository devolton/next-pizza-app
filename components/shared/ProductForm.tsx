'use client'
import {FC} from "react";
import {useCartStore} from "@/shared/store";
import {toast} from "react-hot-toast/headless";
import {ProductWithRelation} from "@/@types/prisma";
import ChoosePizzaForm from "@/components/shared/ChoosePizzaForm";
import ChooseProductForm from "@/components/shared/ChooseProductForm";

interface Props {
    product:ProductWithRelation,
    onSubmit?:VoidFunction,
    className?: string;
}

const ProductForm: FC<Props> = ({product,onSubmit:_onSubmit }) => {
    const addCartItem = useCartStore(state => state.addCartItem);
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const loading = useCartStore(state => state.loading);
    const onSubmit = async (productItemId?: number, ingradients?: number[]) => {
        const itemId =productItemId ?? firstItem.id;
        try {
            await addCartItem({
                productItemId: itemId,
                ingradients,
            });
            toast.success(`${product.name} позиция успешно добавлена`,{
                icon:'✅'
            });
            _onSubmit?.();
        } catch (ex) {
            toast.error('Не удалось добавить товар в корзину',{
                icon:'⛔'
            });
        }
    }

    if(isPizzaForm){
         return (  <ChoosePizzaForm imageUrl={product.imageUrl}
                                    name={product.name}
                                    ingredients={product.ingradients}
                                    items={product.items}
                                    loading={loading}
                                    onSubmit={onSubmit}/>)
    }


    return (
        <ChooseProductForm name={product.name}
                           onSubmit={onSubmit}
                           loading={loading}
                           price={firstItem.price}
                           imageUrl={product.imageUrl}/>
    );
};

export default ProductForm;
