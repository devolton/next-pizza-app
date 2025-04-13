import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/components/shared/Title";
import {Button} from "@/components/ui/button";

interface Props {
    imageUrl: string;
    name: string;
    loading?: boolean;
    price: number;
    onSubmit?: VoidFunction;
    className?: string;
}

const ChooseProductForm: FC<Props> = ({
                                          imageUrl,
                                          name,
                                          loading,
                                          price,
                                          onSubmit,
                                          className
                                      }) => {

    return (
        <div className={cn('flex flex-1', className)}>
            <div className={'flex flex-1 justify-center items-center relative'}>
                <img
                    alt={name}
                    src={imageUrl}
                    className={'relative left-2 top-2 z-10 transition-all duration-300 w-[350px] h-[350px]'}

                />

            </div>
            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold mb-1'}/>

                <Button
                    loading={loading}
                    onClick={()=>onSubmit?.()}
                    className={'h-[55px] px-10 text-base w-full mt-10 rounded-[18px]'}
                >
                    Добавить в корзину ${price}
                </Button>

            </div>

        </div>
    );
};

export default ChooseProductForm;
