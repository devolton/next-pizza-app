'use client';

import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {formRegisterSchema, TFormRegisterValues} from "@/components/shared/modal/auth/schema";
import {FormInput} from "@/components/shared/form";
import {Button} from "@/components/ui/button";
import {registerUser} from "@/app/actions";


interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({onClose, onClickLogin}) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
                confirmPassword: data.confirmPassword
            });

            toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
                icon: '✅',
            });

            onClose?.();
        } catch (error) {
            console.log("[REGISTRATION]", error);
            return toast.error('Неверный E-Mail или пароль', {
                icon: '❌',
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="Email" required/>
                <FormInput name="fullName" label="Full name" required/>
                <FormInput name="password" label="Password" type="password" required/>
                <FormInput name="confirmPassword" label="Confirm password" type="password" required/>

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Register
                </Button>
            </form>
        </FormProvider>
    );
};