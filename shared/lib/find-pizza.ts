import {prisma} from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;

}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 500;

export const findPizza = async (params: GetSearchParams) => {
    const sizes: number[] | undefined = params.sizes?.split(',').map(Number);
    const types: number[] | undefined= params.pizzaTypes?.split(',').map(Number);
    const ingredients: number[] | undefined = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;


    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    ingradients: ingredients
                        ? {
                            some: {
                                id: {
                                    in: ingredients
                                }
                            }
                        }
                        : undefined,
                    items:{
                        some:{
                            size:{
                                in:sizes
                            },
                            pizzaType:{
                                in:types
                            },
                            price:{
                                gte:minPrice, //>=
                                lte:maxPrice  //<=
                            }
                        }
                    },
                },
                include: {
                    ingradients: true,
                    items: {
                        where:{
                            price:{
                                gte:minPrice,
                                lte:maxPrice

                            }
                        },
                        orderBy:{
                            price:'asc'
                        }
                    }
                }
            }
        }

    });
    return categories;
}