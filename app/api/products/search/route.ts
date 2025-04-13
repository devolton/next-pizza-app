import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
    let query = req.nextUrl.searchParams.get('query');
    if (!query)
        query = '';
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        take:5,
    });
    return NextResponse.json(products)


}