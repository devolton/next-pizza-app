import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import Categories from "@/components/shared/Categories";
import SortPopup from "@/components/shared/Sort-popup";
import Container from "@/components/shared/Container";
import {Category} from "@prisma/client";

interface Props {
    categories: Category[];
    className?: string;
}

const TopBar: FC<Props> = ({categories,className}) => {
    return (
        <div className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5 ', className)}>
            <Container className={'flex justify-between items-center'}>
                <Categories items={categories}/>
                <SortPopup/>
            </Container>
        </div>
    );
};

export default TopBar;