'use client'
import {FC, useEffect, useRef} from "react";
import {Title} from "@/components/shared/Title";
import {useIntersection} from "react-use";
import {cn} from "@/shared/lib/utils";
import ProductCard from "@/components/shared/ProductCard";
import {useCategoryStore} from "@/shared/store/category";
import {ProductWithRelation} from "@/@types/prisma";


interface Props {
    title: string;
    products: ProductWithRelation[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}


const ProductsGroupList: FC<Props> = ({title, products, className, listClassName, categoryId}) => {
    const setActiveCategoryId = useCategoryStore((state)=>state.setActiveId)
    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersection: IntersectionObserverEntry | null = useIntersection(intersectionRef, {
        threshold: 0.4
    });
    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title}
                   className={'font-extrabold mb-5'}
                   size={'lg'}/>
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    products.map((product) => (
                        <ProductCard id={product.id}
                                     key={`product-${product.id}`}
                                     name={product.name}
                                     price={product.items[0].price}
                                     ingradients={product.ingradients}
                                     imageUrl={product.imageUrl}/>
                    ))
                }

            </div>

        </div>
    );
};

export default ProductsGroupList;
