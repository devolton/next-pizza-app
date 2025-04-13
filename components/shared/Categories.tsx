'use client'
import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/store/category";
import {Category} from "@prisma/client";

interface Props {
    items: Category[];
    className?: string;
}


const Categories: FC<Props> = ({items,className}) => {
    const categoryActiveId: number = useCategoryStore(state => state.activeId);


    return (
        <div className={cn("inline-flex", className)}>
            {
                items.map((cat) => {
                    return <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
                        (categoryActiveId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary'))}
                              key={`header-category-${cat.id}`}
                              href={`/#${cat.name}`}>
                        <button className={'cursor-pointer'}>{cat.name}</button>
                    </a>
                })
            }
        </div>
    );
};

export default Categories;