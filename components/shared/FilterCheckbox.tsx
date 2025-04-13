import React, {FC, ReactNode} from 'react'
import {Checkbox} from "@/components/ui/checkbox";

export interface FilterCheckboxProps {
    text: string;
    value: string;
    endAdornment?: ReactNode;
    onCheckedChangeHandler?: (isChecked: boolean) => void;
    isChecked?: boolean;
    name?: string
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({text, value, endAdornment, onCheckedChangeHandler, isChecked,name}) => {
    return (
        <div className={'flex items-center space-x-2 cursor-pointer'}>
            <Checkbox className={'rounded-[8px] w-6 h-6'}
                      value={value}
                      onCheckedChange={onCheckedChangeHandler}
                      checked={isChecked}
                      id={`checkbox-${name}-${String(value)}`}/>
            <label htmlFor={`checkbox-${name}-${String(value)}`}
                   className={'leading-none cursor-pointer gap-1'}>
                {text}
            </label>
            {endAdornment}
        </div>
    );
};

export default FilterCheckbox;