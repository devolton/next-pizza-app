import {z} from 'zod'



export const checkoutFormSchema = z.object({
    firstName:z.string().min(2,{message:'Имя должно содержить не менее двух символов!'}),
    lastName:z.string().min(2,{message:'Фамилия должно содержить не менее двух символов!'}),
    phone:z.string().min(10,{message:'Введите коректный номер телефона!'}),
    address:z.string().min(5,{message:'Введите коректный адрес!'}),
    email:z.string().email({message:'Введите коректную почту!'}),
    comment:z.string().optional()
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;