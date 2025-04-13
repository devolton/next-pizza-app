import * as zod from 'zod'

export const passwordSchema = zod.string().min(4, {message: 'Password must be at least 4 characters'});

export const formLoginSchema = zod.object({
    email: zod.string().email({message: 'Invalid email address'}),
    password: passwordSchema,

})

export const formRegisterSchema = formLoginSchema.merge(
    zod.object({
        fullName: zod.string().min(2, {message: 'Input name and surname'}),
        confirmPassword: passwordSchema,

    }))
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords is not equals',
        path: ['confirmPassword'],
    });

export type TFormLoginValues = zod.infer<typeof formLoginSchema>;
export type TFormRegisterValues = zod.infer<typeof formRegisterSchema>;