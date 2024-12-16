import create from 'zustand';
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
        increase: () => set((state, {payload}) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id===itemId);
            item.amount++;
        }),
        decrease: () => set((state, {payload}) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id===itemId);
            item.amount--;
        }),
        removeItem: () => set((state, {payload}) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        }),
        // calculateTotal action
        calculateTotal: () => set((state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        }),
        // clearCart action
        clearCart: () => set((state) => {
            state.cartItems = [];
        })
    },
}));