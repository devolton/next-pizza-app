import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {ArrowUpDown} from "lucide-react";
interface Props {
    className?: string;
}

const SortPopup:FC<Props> = ({className}) => {
    return (
        <div className={cn('inline-flex items-center gap-1 bg-gray-50 h-[52px] rounded-2xl cursor-pointer',className)}>
            <ArrowUpDown size={16}/>
            <b>Сортування:</b>
            <b className={'text-primary'}>популярне</b>

        </div>
    );
};

export default SortPopup;