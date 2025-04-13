'use server'

import {CheckoutFormValues} from "@/shared/constants/schemas/checkout-form-schems";
import {cookies} from "next/headers";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, User} from "@prisma/client";
import {createPayment} from "@/shared/lib/create-payment";
import {getUserSession} from "@/shared/lib/get-user-session";
import {hashSync} from "bcrypt";
import {TFormRegisterValues} from "@/components/shared/modal/auth/schema";
import {PayOrder} from "@/components/shared/email-templates";
import {sendEmail} from "@/shared/lib";
import VerificationCode from "@/components/shared/email-templates/VerificationCode";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = await cookies();
        const cartToken = cookieStore.get("cartToken")?.value;
        if (!cartToken) {
            throw new Error("Can't find cartToken for checkout");
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingradients: true,
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        });
        if (!userCart) {
            throw new Error("Can't find cart!");
        }
        if (userCart?.totalAmount === 0) {
            throw new Error("Cart is empty");
        }
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }

        });
        await prisma.cart.update({
            where: {
                id: userCart?.id
            },
            data: {
                totalAmount: 0
            }
        })
        await prisma.cartItem.deleteMany({
            where: {
                cardId: userCart.id
            }
        })

        //todo CREATE PAYMENT
        const href: string = createPayment(order.totalAmount, String(order.id), `Оплата за замовлення #${order.id}`);

        // todo chaange to email from data
        await sendEmail('voloshko.03@gmail.com', `Next Pizza / Оплатите заказ №${order.id}`, await PayOrder({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: href
        }));
        return href;


    } catch (error) {
        console.log(error);
    }


}

export async function updateUserInfo(body: TFormRegisterValues) {
    try {
        const currentUser = await getUserSession();
        if (!currentUser) {
            throw new Error('User is not found!');
        }
        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })
        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: (body.password) ? hashSync(body.password, 10) : findUser?.password

            }
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function registerUser(body: TFormRegisterValues) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });
        if (user) {
            if (!user.verified) {
                throw new Error("User is not verified!");
            }
            throw new Error("User is already exist!");
        }
        const createdUser: User = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10)
            }
        });

        const code: number = Math.floor(100000 + Math.random() * 1000000);

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id
            }
        });
        await sendEmail(
            'voloshko.03@gmail.com', //todo change to email from form
            'Next pizza | 🗒️ Please, confirm your email',
            await VerificationCode({
                code: String(code)
            })
        );

    } catch (error) {
        console.log(error);
        throw error;
    }

}