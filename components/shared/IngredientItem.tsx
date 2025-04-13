
import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {CircleCheck} from "lucide-react";

interface Props {
    name: string;
    price: number;
    imageUrl: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

const IngredientItem: FC<Props> = ({
                                    name,
                                    price,
                                    imageUrl,
                                    active,
                                    onClick,
                                    className
                                }) => {
    return (
        <div
            className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
                {'border border-primary ': active}
                , className)} onClick={onClick}>
            {active && <CircleCheck className={'absolute right-2 top-2 text-primary'}/> }
            <img width={110}
                 alt={name}
                 height={110}
                 src={imageUrl}/>
            <span className={'text-xs mb-1'}>{name}</span>
            <span className={'font-bold'}>{price} $</span>

        </div>
    );
};

export default IngredientItem;
