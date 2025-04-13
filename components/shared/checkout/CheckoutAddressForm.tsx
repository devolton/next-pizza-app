import {FC} from "react";
import {WhiteBlock} from "@/components/shared/WhiteBlock";
import {FormInput, FormTextarea} from "@/components/shared/form";

interface Props {
    className?: string;
}

const CheckoutAddressForm: FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title={'3. Адрес доставки'} className={className}>
            <div className={'flex flex-col gap-5'}>
                <FormInput name={'address'} className={'text-base'} placeholder={'Input address...'}/>
                <FormTextarea name={'comment'}
                              className={'text-base'}
                              rows={5}
                              placeholder={'Комментарий к заказу...'}/>

            </div>
        </WhiteBlock>
    );
};

export default CheckoutAddressForm;
