'use client'
import React, {FC, PropsWithChildren} from 'react';
import {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
            <NextTopLoader/>
            <Toaster/>
        </>

    );
};

export default Providers;