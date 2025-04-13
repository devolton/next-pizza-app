import {FC} from "react";
import {CartItemDTO} from "@/shared/services/dto/cart.dto";

interface Props {
    orderId: number,
    items: CartItemDTO[],
    className?: string;
}

const OrderSuccess: FC<Props> = ({orderId, items, className}) => {
    return (
        <div className={className}>
            <h1>Дякуємо за покупку!</h1>
            <p>Ваше замовлення № {orderId}</p>

            <hr/>
            <ul>
                {
                    items.map(item=>(
                        <li key={`item-${item.id}`}>
                            {item.productItem.product.name} | {item.productItem.price} x {item.quantity} шт {' '}
                            {item.productItem.price * item.quantity} UAH

                        </li>
                    ))
                }
            </ul>


        </div>
    );
};

export default OrderSuccess;
