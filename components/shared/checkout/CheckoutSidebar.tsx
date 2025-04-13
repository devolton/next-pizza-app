import {FC} from "react";
import {WhiteBlock} from "@/components/shared/WhiteBlock";
import CheckoutItemDetails from "@/components/shared/checkout/CheckoutItemDetails";
import {ArrowRight, Package, Percent, Truck} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/shared/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

interface Props {
    loading: boolean;
    totalAmount: number;
    className?: string;
}

const VAT_PERCENT = 20;
const DELIVERY_PRICE = 150;

const CheckoutSidebar: FC<Props> = ({loading, totalAmount, className}) => {

    const vatPrice = (totalAmount * VAT_PERCENT) / 100;

    const totalPrice = vatPrice + totalAmount + DELIVERY_PRICE;
    return (
        <WhiteBlock className={cn('p-6 sticky top-4', className)}>
            <div className={'flex flex-col gap-1'}>
                <span className={'text-xl'}>Итого:</span>
                {
                    loading ? <Skeleton className={'h-11 w-48'}/> :
                        <span className={'h-11 text-[34px] font-extrabold'}>{totalPrice} $</span>
                }

            </div>
            <CheckoutItemDetails title={<div className={'flex items-center'}>
                <Package size={18} className={'mr-2 text-gray-400'}/>
                Стоимость корзины
            </div>} value={loading
                ?
                <Skeleton className={'h-6 w-16 rounded-[6px]'}/>
                :
                `${totalAmount} $`}/>
            <CheckoutItemDetails title={
                <div className={'flex items-center'}>
                    <Percent
                        size={18}
                        className={'mr-2 text-gray-400'}/>
                    Налоги
                </div>
            }
                                 value={loading
                                     ?
                                     <Skeleton className={'h-6 w-16 rounded-[6px]'}/>
                                     :
                                     `${vatPrice} $`}/>
            <CheckoutItemDetails title={
                <div className={'flex items-center'}>
                    <Truck size={18} className={'mr-2 text-gray-400'}/>
                    Доставка
                </div>

            } value={loading
                ?
                <Skeleton className={'h-6 w-16 rounded-[6px]'}/>
                :
                `${DELIVERY_PRICE} $`}/>
            <Button loading={loading}
                    type="submit"
                    className={'w-full h-14 rounded-2xl mt-6 text-base font-bold'}>
                Перейти к оплате
                <ArrowRight className={'ml-2 w-5'}/>
            </Button>

        </WhiteBlock>
    );
};

export default CheckoutSidebar;
