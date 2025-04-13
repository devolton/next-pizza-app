import {Cart, CartItem, Ingradient, Product, ProductItem} from "@prisma/client";

export type CartItemDTO =CartItem & {
    productItem:ProductItem & {
        product:Product
    },
    ingradients:Ingradient[]
}




export interface CartDTO extends Cart {
    items:CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId:number;
    ingradients?:number[];
    quantity?:number;
}