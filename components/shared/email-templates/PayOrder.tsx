import { FC } from "react";

interface EmailTemplateProps {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrder: FC<EmailTemplateProps> = ({ orderId, totalAmount,paymentUrl }) => {
    return (
        <div>
            <h1>Заказ № ${orderId}</h1>
            <p>Оплатите на сумму ${totalAmount} UAH. Перейдите <a href={paymentUrl}> по этой ссылке...</a></p>

        </div>
    );
};


