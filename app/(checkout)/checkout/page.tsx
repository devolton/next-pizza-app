'use client'
import Container from "@/components/shared/Container";
import {Title} from "@/components/shared/Title";
import {useCart} from "@/shared/hooks";
import {useEffect, useState} from "react";
import CheckoutSidebar from "@/components/shared/checkout/CheckoutSidebar";
import {zodResolver} from "@hookform/resolvers/zod";
import CheckoutCart from "@/components/shared/checkout/CheckoutCart";
import {FormProvider, useForm} from "react-hook-form";
import CheckoutPersonalForm from "@/components/shared/checkout/CheckoutPersonalForm";
import CheckoutAddressForm from "@/components/shared/checkout/CheckoutAddressForm";
import {checkoutFormSchema, CheckoutFormValues} from "@/shared/constants/schemas/checkout-form-schems";
import {cn} from "@/shared/lib/utils";
import {createOrder} from "@/app/actions";
import {toast} from "react-hot-toast/headless";


export default function CheckoutPage() {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {totalAmount, items, loading, fetchCartItems, updateItemQuantity, removeCartItem} = useCart();
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: ""
        },

    });

    useEffect(() => {
        fetchCartItems();
    }, []);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = (type === 'plus') ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }
    const onSubmitHandler = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);

            const url: string | undefined = await createOrder(data);

            toast.success("Заказ успешно создан! Переход на оплату...", {
                icon: '✅'
            })
            if (url) {
                location.href = url;
            }

        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error("Не удалось создать заказ", {
                icon: '⛔'
            })
        }

    }

    return (
        <Container className={'mt-10'}>
            <Title text={'Оформление заказа'} className={'font-extrabold mb-8 text-[36px]'}/>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className={'flex gap-10 '}>
                        <div className={'flex flex-col gap-10 flex-1 mb-20'}>
                            <CheckoutCart items={items}
                                          loading={loading}
                                          onClickCountButton={onClickCountButton}
                                          removeCartItem={removeCartItem}/>
                            <CheckoutPersonalForm className={cn({'opacity-40 pointer-events-none': loading})}/>
                            <CheckoutAddressForm className={cn({'opacity-40 pointer-events-none': loading})}/>

                        </div>
                        <div className={'w-[450px]'}>

                            <CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount}/>

                        </div>
                    </div>
                </form>
            </FormProvider>

        </Container>
    )
}