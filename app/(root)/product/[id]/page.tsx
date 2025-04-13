import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import Container from "@/components/shared/Container";
import ProductForm from "@/components/shared/ProductForm";

const ProductPage = async ({params: {id}}: { params: { id: string } }) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingradients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }
            },
            items:true
        }
    });


    if (!product) {
        return notFound();
    }
    return (
        <Container
            className={'flex flex-col my-10'}
        >
           <ProductForm product={product}/>

        </Container>
    );
};

export default ProductPage;
