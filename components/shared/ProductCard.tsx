import {FC} from "react";
import { Plus} from "lucide-react";
import {Title} from "@/components/shared/Title";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Ingradient} from "@prisma/client";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingradients:Ingradient[];
    className?: string;
}

const ProductCard: FC<Props> = ({id, name, price, imageUrl, ingradients,className}) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
                    <img className={'w-[215px] h-[215px]'}
                           width={215}
                           height={215}
                           src={imageUrl} alt={name}/>
                </div>
                <Title className={'mt-1 mb-5 font-bold'} size={'sm'} text={name}/>
                <p className={'text-sm text-gray-400'}>
                    {
                        ingradients.map((ingradient)=>ingradient.name).join(', ')
                    }
                </p>
                <div className={'flex justify-between items-center mt-4'}>
                    <span className={'text-[20px]'}>
                    from <b>${price}</b>
                    </span>
                    <Button variant={'secondary'} className={'font-bold text-base'}>
                        <Plus size={20} className={' mr-1'}/>
                        Add
                    </Button>

                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
