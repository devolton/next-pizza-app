'use client'
import {FC, useRef, useState} from "react";
import {cn} from "@/shared/lib/utils";
import {Search} from "lucide-react";
import {useClickAway, useDebounce} from "react-use";
import Link from "next/link";
import {Api} from "@/shared/services/api-client";
import {Product} from "@prisma/client";

interface Props {
    className?: string;
}

const SearchInput: FC<Props> = ({className}) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setIsFocused(false);
    })


    useDebounce(async () => {
            try {
                const response: Product[] = await Api.products.search(searchQuery);
                setProducts(response);
            } catch (e) {
                console.log(e);
            }
        },
        250,
        [searchQuery]);

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const onClickItem = () => {
        setIsFocused(false);
        setSearchQuery('');
        setProducts([]);
    }

    return (
        <>
            {isFocused && <div className={'fixed top-0 left-0 right-0 bottom-0 z-30 bg-black/50'}/>}
            <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
                <Search className={'absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'}/>
                <input
                    type={'text'}
                    className={'rounded-2xl outline-none bg-gray-100 w-full pl-11'}
                    placeholder={'Search pizza...'}
                    onFocus={() => {
                        setIsFocused(true)
                    }}
                    value={searchQuery}
                    onChange={onChangeSearchInput}
                />
                {products.length > 0 && <div
                    className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-300 invisible opacity-0 z-30',
                        isFocused && 'visible opacity-100 top-12')}>
                    {
                        products.map((product) => (
                                <Link
                                    onClick={onClickItem}
                                    key={`search-product-${product.id}`}
                                    className={'flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10'}
                                    href={`/product/${product.id}`}>
                                    <img className={'rounded-sm'} src={product.imageUrl} alt={product.name} width={32}
                                         height={32}/>
                                    <span>{product.name}</span>
                                </Link>
                            )
                        )
                    }
                </div>}
            </div>

        </>
    );
};

export default SearchInput;
