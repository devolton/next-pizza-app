'use client'
import React, {FC, useMemo} from 'react';
import {Title} from "@/components/shared/Title";
import {Input} from "@/components/ui/input";
import {RangeSlider} from "@/components/shared/RangeSlider";
import CheckboxFiltersGroup from "@/components/shared/checkout/CheckboxFiltersGroup";
import {useIngredients, useFilters, useQueryFilters} from "../../shared/hooks";

interface Props {
    className?: string;
}


const Filters: FC<Props> = ({className}) => {
    const {ingredients, loading} = useIngredients();
    const filtersData = useFilters();
    const filters = useMemo(() => filtersData, [filtersData]);
    useQueryFilters(filters);
    const items = ingredients.map(item => ({value: String(item.id), text: item.name}));

    const updatePrices = (prices: number[]) => {
        filters.setPrice('priceFrom', prices[0])
        filters.setPrice('priceTo', prices[1])

    }


    return (
        <div className={className}>
            <Title size={'sm'} text={"Filters"} className={'mb-5 font-bold'}/>
            {/*height checkbox*/}
            <div className={'flex flex-col gap-4'}>
                <CheckboxFiltersGroup title={'Dough type'}
                                      className={'mb-5'}
                                      searchInputPlaceholder={'Search...'}
                                      limit={4}
                                      name={'pizzaTypes'}
                                      loading={loading}
                                      items={[
                                          {text: 'Тонкое', value: '1'},
                                          {text: 'Традиционное', value: '2'},

                                      ]}
                                      onClickCheckbox={filters.setPizzaTypes}
                                      selectedValues={filters.pizzaTypes}/>

                <CheckboxFiltersGroup title={'Sizes'}
                                      className={'mb-5'}
                                      searchInputPlaceholder={'Search...'}
                                      limit={4}
                                      name={'sizes'}
                                      loading={loading}
                                      items={[
                                          {text: '20 sm', value: '20'},
                                          {text: '30 sm', value: '30'},
                                          {text: '40 sm', value: '40'}
                                      ]}
                                      onClickCheckbox={filters.setSizes}
                                      selectedValues={filters.sizes}
                />
            </div>
            {/*price*/}
            <div className={'mt-5 border-y border-y-neutral-100 pb-7 py-6'}>
                <p className={'font-bold mb-3'}>Price from to:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input type={'number'}
                           placeholder={'0'}
                           min={0}
                           value={String(filters.prices.priceFrom)}
                           max={500}
                           onChange={(e) => filters.setPrice('priceFrom', Number(e.target.value))}/>
                    <Input type={'number'}
                           min={100}
                           max={500}
                           value={String(filters.prices.priceTo)}
                           placeholder={'500'}
                           onChange={(e) => filters.setPrice('priceTo', Number(e.target.value))}/>
                </div>
                <RangeSlider min={0} max={500} step={10} value={[
                    filters.prices.priceFrom || 0,
                    filters.prices.priceTo || 500,
                ]}
                             onValueChange={updatePrices}/>
            </div>

            <CheckboxFiltersGroup title={'Ingredients'}
                                  searchInputPlaceholder={'Search...'}
                                  className={'mt-5'}
                                  limit={4}
                                  name={'ingredients'}
                                  loading={loading}
                                  defaultItems={items.slice(0, 6)}
                                  items={items}
                                  onClickCheckbox={filters.setIngredients}
                                  selectedValues={filters.selectedIngredients}
            />

        </div>
    );
};

export default Filters;