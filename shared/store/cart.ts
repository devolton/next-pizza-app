import {create} from 'zustand';
import {Api} from '../services/api-client';
import {getCartDetails} from '../lib';
import {CartStateItem} from '../lib/get-cart-details';
import {CartDTO, CreateCartItemValues} from "@/shared/services/dto/cart.dto";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    /* Запрос на добавление товара в корзину */
    addCartItem: (values: CreateCartItemValues) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({loading: true, error: false});
            const data = await Api.cart.fetchCart();
            const pair = getCartDetails(data);

            set({items: pair.items, totalAmount: pair.totalAmount});
        } catch (err) {
            set({error: true});
            console.log(err);
        } finally {
            set({loading: false});
        }

    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({loading: true, error: false});
            const data = await Api.cart.updateItemQuantity(id, quantity);
            const pair = getCartDetails(data);

            set({items: pair.items, totalAmount: pair.totalAmount});
        } catch (err) {
            set({error: true});
            console.log(err);
        } finally {
            set({loading: false});
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set(state => ({
                loading: true,
                error: false,
                items: state.items.map(item => (item.id === id ? {...item, disabled: true} : item))
            }));
            const data = await Api.cart.removeCartItem(id);
            const pair = getCartDetails(data);

            set({items: pair.items, totalAmount: pair.totalAmount});
        } catch (err) {
            set({error: true});
            console.log(err);
        } finally {
            set(state => ({
                loading: false,
                items: state.items.map(item => (item.id === id ? {...item, disabled: false} : item))
            }));
        }
    },
    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({loading: true, error: false});
            const data = await Api.cart.addCartItem(values);
            const pair = getCartDetails(data);

            set({items: pair.items, totalAmount: pair.totalAmount});
        } catch (err) {
            set({error: true});
            console.log(err);
        } finally {
            set({loading: false});
        }
    }

}));