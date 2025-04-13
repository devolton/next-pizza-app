import { FC } from "react";
import {WhiteBlock} from "@/components/shared/WhiteBlock";
import {FormInput} from "@/components/shared/form";

interface Props {

    className?: string;
}

const CheckoutPersonalForm: FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title={'2. Персональные данные'} className={className}>
            <div className={'grid grid-cols-2 gap-5'}>
                <FormInput name={'firstName'} className={'text-base'} placeholder={'Name'}/>
                <FormInput name={'lastName'} className={'text-base'} placeholder={'Last name'}/>
                <FormInput name={'email'} className={'text-base'} placeholder={'Email'}/>
                <FormInput name={'phone'} className={'text-base'} placeholder={'Phone'}/>
            </div>
        </WhiteBlock>
    );
};

export default CheckoutPersonalForm;
