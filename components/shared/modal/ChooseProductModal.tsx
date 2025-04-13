'use client'
import {FC} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {cn} from "@/shared/lib/utils";
import {useRouter} from "next/navigation";
import {ProductWithRelation} from "@/@types/prisma";
import ProductForm from "@/components/shared/ProductForm";

interface Props {
    product: ProductWithRelation
    className?: string;
}

const ChooseProductModal: FC<Props> = ({product, className}) => {
    const router = useRouter();


    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-w-[1000px] min-h-[500px] bg-white overflow-hidden', className)}>
                <ProductForm product={product} onSubmit={() => {
                    router.back()
                }}/>
            </DialogContent>
        </Dialog>
    );
};

export default ChooseProductModal;
