import {FC} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {formLoginSchema, TFormLoginValues} from "@/components/shared/modal/auth/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Title} from "@/components/shared/Title";
import {FormInput} from "@/components/shared/form";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {signIn} from "next-auth/react";

interface Props {
    onClose?: VoidFunction;
}

const LoginForm: FC<Props> = ({onClose}) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false
            });
            if (!resp?.ok) {
                throw new Error()
            }
            toast.success('Вы успешно авторизированы', {
                icon: '✅'
            });
            onClose?.();

        } catch (err) {
            console.log('[LOGIN]', err);
            toast.error('Не удалось войти в аккаунт', {
                icon: '⛔'
            })
        }
    }


    return (
        <FormProvider {...form}>
            <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(onSubmit)}>
                <div className={'flex justify-between items-center'}>
                    <div className={'mr-2'}>
                        <Title text={'Authorization'}
                               size='md'
                               className={'font-bold'}/>
                        <p className={'text-gray-400'}>Введите почту чтобы войти в свой аккаунт</p>
                    </div>
                    <img alt={'phone-icon'}
                         width={40}
                         height={40}
                         src={'/phone-icon.png'}/>
                </div>
                <FormInput name={'email'} label={'Email'}/>
                <FormInput name={'password'} label={'Password'} type={'password'} required/>

                <Button className={'h-12 text-base'}
                        type={'submit'}
                        disabled={form.formState.isSubmitting}
                >
                    Login
                </Button>

            </form>

        </FormProvider>
    );
};

export default LoginForm;
