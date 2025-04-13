import {Ingradient, Product, ProductItem} from "@prisma/client";


export type ProductWithRelation = Product & {items:ProductItem[],ingradients:Ingradient[]};