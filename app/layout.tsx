import {Nunito} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import Providers from "@/components/shared/Providers";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["cyrillic"],
    weight: ["400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel={'icon'} href={'/logo.png'}/>
        </head>
        <body className={`${nunito.variable}`}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
