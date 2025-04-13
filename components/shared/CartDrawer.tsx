'use client'
import {FC, PropsWithChildren, useEffect, useState} from "react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {getCartItemDetails} from "@/shared/lib";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import CartDrawerItem from "@/components/shared/CartDrawerItem";
import Image from "next/image";
import {Title} from "@/components/shared/Title";
import {cn} from "@/shared/lib/utils";
import {useCart} from "@/shared/hooks";


const CartDrawer: FC<PropsWithChildren> = ({children}) => {
    const {totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem} = useCart();
    const [redirecting,setRedirecting] = useState<boolean>(false);

    useEffect(() => {
        fetchCartItems()
    }, []);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = (type === 'plus') ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }


    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className={'flex flex-col justify-between pb-0 bg-[#F4F1EE]'}>
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {totalAmount > 0 && <SheetHeader>
                        <SheetTitle>
                            В корзине <span className={'font-bold'}>{items.length} товара</span>
                        </SheetTitle>
                    </SheetHeader>
                    }

                    {
                        totalAmount == 0 && <div className={'flex flex-col items-center justify-center w-72 mx-auto'}>
                            <Image src={'/empty-box.png'} alt={'empty-box'} width={120} height={120}/>
                            <Title text={'Корзина пуста'} size={'sm'} className={'text-center font-bold my-2'}/>
                            <p className={'text-center text-neutral-500 mb-5'}>
                                Добавте хотя бы одну пиццу, чтобы совершить заказ
                            </p>
                            <SheetClose>
                                <Button className={'w-56 h-12 text-base'} size={'lg'}>
                                    <ArrowLeft className={'w-5 mr-2'}/>
                                    Вернутся назад
                                </Button>
                            </SheetClose>

                        </div>
                    }

                    {totalAmount > 0 &&
                        <>
                            <div className={'mt-5 scrollbar overflow-hidden flex-1'}>
                                {
                                    items.length > 0 && items.map(item => (
                                        <div key={`cart-drawer-item-${item.id}`} className={'mb-2'}>
                                            <CartDrawerItem id={item.id}
                                                            imageUrl={item.imageUrl}
                                                            disabled={item.disabled}
                                                            details={item.pizzaSize && item.pizzaType ?
                                                                getCartItemDetails(item.ingradients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                                                                : ''}
                                                            name={item.name}
                                                            price={item.price}
                                                            quantity={item.quantity}
                                                            onClickCountButton={(type) => {
                                                                onClickCountButton(item.id, item.quantity, type)
                                                            }}
                                                            onClickRemove={() => {
                                                                removeCartItem(item.id);
                                                            }}/>
                                        </div>
                                    ))

                                }


                            </div>
                            <SheetFooter className={'-mx-4 bd-white p-8'}>
                                <div className={'w-full'}>
                                    <div className={'flex mb-4'}>
                          <span className={'flex flex-1 text-lg text-neutral-500 '}>
                           Итого
                              <div
                                  className={'flex-1 border-b border-b-neutral-200 border-dashed relative -top-1 mx-2'}/>
                          </span>
                                        <span className={'font-bold text-lg'}>{totalAmount} $</span>
                                    </div>
                                    <Link href={'/checkout'}>
                                        <Button type={'submit'}
                                                onClick={()=>{setRedirecting(true)}}
                                                loading={redirecting}
                                                className={'w-full h-12 text-base'}>
                                            Оформить заказ
                                            <ArrowRight className={'ml-5 w-5'}/>
                                        </Button>

                                    </Link>

                                </div>
                            </SheetFooter>
                        </>

                    }


                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
