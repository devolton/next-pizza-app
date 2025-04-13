'use client'
import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import * as CartItem from './cart-item-details'
import {CartItemProps} from "@/components/shared/cart-item-details/cart-item-details.types";
import {CountButton} from "@/components/shared/count-button";
import {Trash2Icon} from "lucide-react";

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

const CartDrawerItem: FC<Props> = ({

                                       imageUrl,
                                       price,
                                       name,
                                       quantity,
                                       details,
                                       disabled,
                                       onClickCountButton,
                                       onClickRemove,
                                       className
                                   }) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6',
            {'opacity-50 pointer-events-none':disabled},
            className)}>
            <CartItem.Image src={imageUrl}/>
            <div className={'flex-1'}>
                <CartItem.Info name={name} details={details}/>
                <hr className={'my-3'}/>

                <div className={'flex items-center justify-between'}>
                    <CountButton value={quantity} onClick={onClickCountButton}/>

                    <div className={'flex items-center gap-3'}>
                        <CartItem.Price value={Number(price.toFixed(2))}/>
                        <Trash2Icon className={'text-gray-400 cursor-pointer hover:text-gray-600'}
                                    size={16}
                                    onClick={onClickRemove}/>
                    </div>
                </div>

            </div>

        </div>
    );

};

export default CartDrawerItem;
