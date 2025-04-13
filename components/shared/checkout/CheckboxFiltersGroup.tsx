'use client'
import {FC, useState} from "react";
import FilterCheckbox, {FilterCheckboxProps} from "@/components/shared/FilterCheckbox";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";


interface Props {
    title: string;
    items: FilterCheckboxProps[];
    defaultItems?: FilterCheckboxProps[];
    limit: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    defaultValues?: string[];
    selectedValues: Set<string>;
    onClickCheckbox?: (id: string) => void;
    name?: string;
    className?: string;
}

const CheckBoxFiltersGroup: FC<Props> = ({
                                             title,
                                             items,
                                             defaultItems,
                                             loading,
                                             limit,
                                             searchInputPlaceholder,
                                             defaultValues,
                                             selectedValues,
                                             onClickCheckbox,
                                             name,
                                             className
                                         }) => {
    const [isShowAll, setIsShowAll] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    if (loading) {
        return <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            {
                ...Array(limit).fill(0).map((_, index) => ( //generetion of undefine array
                    <Skeleton key={`sceleton-${index}`}
                              className={'mb-4 h-6 rounded-[8px]'}/>
                ))
            }
            <Skeleton className={'mb-4 w-28 h-6 rounded-[8px]'}/>
        </div>
    }


    const list: FilterCheckboxProps[] = isShowAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items)?.slice(0, limit);


    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }


    return (
        <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            {
                isShowAll && <div className={'mb-5'}>
                    <Input placeholder={searchInputPlaceholder}
                           onChange={onChangeSearchInput}
                           className={'bg-gray-50 border-none'}/>
                </div>
            }
            <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
                {
                    list.map((item, index) =>
                        (
                            <FilterCheckbox
                                key={`checkbox-filter-group-${index}`}
                                text={item.text}
                                value={item.value}
                                endAdornment={item.endAdornment}
                                isChecked={selectedValues?.has(item.value)}
                                name={name}
                                onCheckedChangeHandler={() => {
                                    onClickCheckbox?.(item.value)
                                }}/>
                        ))
                }
            </div>
            {
                items.length > limit && (
                    <div className={isShowAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                        <button onClick={() => {
                            setIsShowAll(!isShowAll)
                        }}
                                className={'text-primary mt-5'}>
                            {isShowAll ? 'Hide' : '+ Show'}
                        </button>
                    </div>
                )
            }

        </div>
    );
};

export default CheckBoxFiltersGroup;
