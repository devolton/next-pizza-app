'use client'

import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import Container from "@/components/shared/Container";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/shared/SearchInput";
import {CartButton} from "@/components/shared/CartButton";
import {useSession, signIn} from "next-auth/react";
import ProfileButton from "@/components/shared/ProfileButton";
import AuthModal from "@/components/shared/modal/auth/AuthModal";

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;

}

const Header: FC<Props> = ({hasSearch = true, hasCart = true, className}) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const {data: session} = useSession();
    console.log(session);
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