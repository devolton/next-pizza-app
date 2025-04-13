import Container from "@/components/shared/Container";
import {Title} from "@/components/shared/Title";
import TopBar from "@/components/shared/TopBar";
import Filters from "@/components/shared/Filters";
import ProductsGroupList from "@/components/shared/ProductsGroupList";
import {Suspense} from "react";
import {findPizza, GetSearchParams} from "@/shared/lib/find-pizza";


export default async function Home({searchParams}:{searchParams:GetSearchParams}) {
    const params =(await searchParams);
    const categories = await findPizza(params);
    return (
        <>
            <Container className={'mt-10'}>
                <Title text={'All pizza'} size={'lg'} className={'font-extrabold'}/>
            </Container>
            <TopBar categories={categories.filter(category=>category.products.length > 0)}/>

            <Container className={'pb-14 mt-10'}>
                {/*filter*/}
                <div className={'flex gap-[80px]'}>
                    <div className={'w-[250px]'}>
                        <Suspense>
                            <Filters/>
                        </Suspense>
                    </div>

                    {/*list of products*/}
                    <div className={'flex-1 '}>
                        <div className={'flex flex-col gap-16'}>
                            {
                                categories.map((category) => (
                                    category.products.length > 0 &&
                                    <ProductsGroupList
                                    key={`category-${category.id}`}
                                    title={category.name}
                                    categoryId={category.id}
                                    products={category.products}
                                    />
                                ))
                            }


                        </div>
                    </div>
                </div>


            </Container>

        </>
    );
}
