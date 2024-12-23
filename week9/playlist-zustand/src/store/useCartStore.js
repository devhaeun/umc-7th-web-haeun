import { create } from 'zustand';
import cartItems from "../constants/cartItems";

// const initialState = {
//     cartItems: cartItems,
//     amount: 0,
//     total: 0,
// }

export const useCartStore = create(set => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
        increase: (itemId) => set((state) => {
            console.log(state, itemId);
            // const item = state.cartItems.find((cartItem) => cartItem.id===itemId);
            // item.amount++;
            const updatedCartItems = state.cartItems.map((cartItem) =>
                cartItem.id === itemId
                ? {...cartItem, amount: cartItem.amount+1 } : cartItem
            );
            return { ...state, cartItems: updatedCartItems };
        }),
        decrease: (itemId) => set((state) => {
            // const itemId = payload;
            // const item = state.cartItems.find((cartItem) => cartItem.id===itemId);
            // item.amount--;
            const updatedCartItems = state.cartItems.map((cartItem) =>
                cartItem.id === itemId
                ? { ...cartItem, amount: cartItem.amount-1 } : cartItem
            );
            return { ...state, cartItems: updatedCartItems };
        }),
        removeItem: (itemId) => set((state) => {
            // const itemId = payload;
            // state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            const updatedCartItems = state.cartItems.filter(
                (cartItem) => cartItem.id!==itemId
            );
            return { ...state, cartItems: updatedCartItems };
        }),
        // calculateTotal action
        calculateTotal: () => set((state) => {
            console.log('calculateTotal 시작:',state);
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            return { ...state, amount, total };
        }),
        // clearCart action
        clearCart: () => set(() => ({
            cartItems: [],
            amount: 0,
            total: 0,
        })),
    },
}));