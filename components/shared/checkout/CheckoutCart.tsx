import {FC} from "react";
import {WhiteBlock} from "@/components/shared/WhiteBlock";
import {CheckoutItem} from "@/components/shared/checkout/CheckoutItem";
import {getCartItemDetails} from "@/shared/lib";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {CartStateItem} from "@/shared/lib/get-cart-details";
import {CheckoutItemSkeleton} from "@/components/shared/checkout/CheckoutItemSkeleton";

interface Props {
    items: CartStateItem[];
    loading?: boolean;
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    className?: string;
}

const CheckoutCart: FC<Props> = ({items, loading, onClickCountButton, removeCartItem, className}) => {
    return (
        <WhiteBlock title={'1. Корзина'} className={className}>
            <div className={'flex flex-col gap-5'}>
                {
                    loading ?
                        [...Array(4)].map((_, index) => (
                            <CheckoutItemSkeleton key={'cart-skeleton-' + index}/>
                        ))
                        :
                        items?.map((item) => (
                            <CheckoutItem id={item.id}
                                          key={`checkout-item-${item.id}`}
                                          imageUrl={item.imageUrl}
                                          details={item.pizzaSize && item.pizzaType ?
                                              getCartItemDetails(item.ingradients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                                              : ''}
                                          name={item.name}
                                          disabled={item.disabled}
                                          price={item.price}
                                          quantity={item.quantity}
                                          onClickCountButton={(type) => {
                                              onClickCountButton(item.id, item.quantity, type)
                                          }}
                                          onClickRemove={() => {
                                              removeCartItem(item.id);
                                          }}/>
                        ))

                }


            </div>
        </WhiteBlock>
    );
};

export default CheckoutCart;
