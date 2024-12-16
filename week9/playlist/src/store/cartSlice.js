import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

const initialState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // increase action
        increase: (state, {payload}) => {
            // console.log(state, payload);
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id===itemId);
            item.amount++;
        },
        // decrease action
        decrease: (state, {payload}) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            item.amount--;
        },
        // removeItem action
        removeItem: (state, {payload}) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        // calculateTotal action
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        },
        // clearCart action
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
})

export const {increase,
              decrease,
              removeItem,
              calculateTotal,
              clearCart
              } = cartSlice.actions;
export default cartSlice.reducer;