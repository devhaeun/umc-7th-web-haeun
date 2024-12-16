import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // open
        openModal: (state) => {
            state.isOpen = true;
        },
        // close
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;