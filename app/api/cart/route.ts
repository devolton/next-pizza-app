import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import crypto from 'crypto'
import {findOrCreateCart} from "@/shared/lib/find-or-create-cart";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            console.log("No token provided");
            return NextResponse.json({totalAmount: 0, items: []})
        }
        const userCart = await prisma.cart.findFirst({
                where: {
                    OR: [
                        {
                            token,
                        },
                    ],
                },
                include: {
                    items: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            productItem: {
                                include: {
                                    product: true
                                }
                            },
                            ingradients: true
                        }
                    }
                },
            }
        );

        return NextResponse.json(userCart)
    } catch (e) {
        console.error(e);
    }


}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;
        if (!token) {
            token = crypto.randomUUID();

        }
        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cardId: userCart.id,
                productItemId: data.productItemId,
                ingradients: {
                    every: {
                        id: {in: data.ingradients}
                    },
                    some:{}
                },

            },
            include: {
                ingradients: true
            }
        })
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1
                }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cardId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingradients: {connect: data.ingradients?.map((id) => ({id}))}
                }
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token);
        return resp;

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: 'Create cart item error'}, {status: 500});
    }
}