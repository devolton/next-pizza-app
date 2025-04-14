'use client'

import React, {FC, useEffect} from 'react';
import {cn} from "@/shared/lib/utils";
import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "@/components/shared/SearchInput";
import {CartButton} from "@/components/shared/CartButton";
import ProfileButton from "@/components/shared/ProfileButton";
import AuthModal from "@/components/shared/modal/auth/AuthModal";
import {useSearchParams} from "next/navigation";
import {toast} from "react-hot-toast";
import {router} from "next/client";

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;

}

const Header: FC<Props> = ({hasSearch = true, hasCart = true, className}) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const searchParams = useSearchParams();
    useEffect(() => {
        let toastMessage: string = '';
        if (searchParams.has("paid")) {
            toastMessage = "Замовлення успішно сплачене! Інформація вадправлена на пошту.";
        }
        if (searchParams.has("verified")) {
            toastMessage = "Замовлення успішно сплачене! Інформація вадправлена на пошту.";
        }
        if (toastMessage) {
            setTimeout(() => {
                router.replace("/");
                toast.success(toastMessage, {
                    duration: 300
                });
            }, 500)
        }
    }, []);


    return (
        <header className={cn(' border-b', className)}>
            <Container className={'flex items-center justify-between py-8'}>
                {/*left part*/}
                <Link href={'/'}>
                    <div className={'flex items-center gap-4'}>
                        <Image src={'/logo.png'} alt={'logo'} width={35} height={35}/>
                        <div>
                            <h1 className={'text-2xl uppercase font-black'}>Next pizza</h1>
                            <p className={'text-sm text-gray-400 leading-3'}>вкусніше нікуди</p>
                        </div>
                    </div>
                </Link>
                {hasSearch && <div className={'flex-1 mx-10'}>
                    <SearchInput/>
                </div>}


                {/*right part*/}
                <div className={'flex item-center gap-3'}>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
                    <ProfileButton onClickSignIn={() => {
                        setOpenAuthModal(true);
                    }}/>
                    {hasCart && <CartButton/>}

                </div>


            </Container>

        </header>
    );
};

export default Header;