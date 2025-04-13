import {FC, InputHTMLAttributes} from "react";
import {RequiredSymbol} from "@/components/shared/RequiredSymbol";
import {Input} from "@/components/ui/input";
import {ErrorText} from "@/components/shared/ErrorText";
import {ClearButton} from "@/components/shared/ClearButton";
import {useFormContext} from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: FC<Props> = ({className, name, label, required, ...props}) => {
    const {register, formState: {errors}, watch, setValue} = useFormContext();
    const value = watch(name);
    const errorMsg: string = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true});
    }

    return (
        <div className={className}>
            {
                label &&
                <p className={'font-medium mb-2'}>
                    {label} {required && <RequiredSymbol/>}
                </p>
            }
            <div className={'relative'}>
                <Input className={'h-12 text-md'}{...register(name)} {...props}/>
                {value && <ClearButton onClick={onClickClear}/>}
            </div>
            {errorMsg && <ErrorText text={errorMsg} className={'mt-2'}/>}
        </div>
    )

}