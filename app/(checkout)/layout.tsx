import {Metadata} from "next";
import Header from "@/components/shared/Header";
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
    title: "Next Pizza | Checkout",
    description: "Checkout your order",
}


export default function CheckoutLayout({
                                           children,
                                       }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main className="min-h-screen bg-[#F4F1EE]">
         <Container>
             <Header className={'border-b-gray-200'} hasSearch={false} hasCart={false}/>
             {children}
         </Container>
        </main>
    );
}