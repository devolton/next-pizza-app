import type {Metadata} from "next";
import {ReactNode} from "react";
import Header from "@/components/shared/Header";


export const metadata: Metadata = {
    title: "Next Pizza | Main",
    description: "Next pizza project",
};

export default function HomeLayout({
                                       modal,
                                       children,

                                   }: Readonly<{
    children: ReactNode;
    modal: ReactNode;
}>) {
    return (
        <main className={'min-h-screen'}>
            <Header/>
            {modal}
            {children}
        </main>
    );
}
