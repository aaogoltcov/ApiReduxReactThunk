import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        form: {
            name: "",
            price: "",
            description:""
        },
        isLoading: false,
        isError: false,
        isUpdated: false,
        isReadonly: false,
    },
    reducers: {
        name: (state, action) => {
            state.form.name = action.payload;
        },
        price: (state, action) => {
            state.form.price = action.payload;
        },
        description: (state, action) => {
            state.form.description = action.payload;
        },
        clear: (state) => {
            state.form.name = "";
            state.form.price = "";
            state.form.description = "";
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        isUpdated: (state, action) => {
            state.isUpdated = action.payload;
        },
        isError: (state, action) => {
            state.isError = action.payload;
        },
        isReadonly: (state, action) => {
            state.isReadonly = action.payload;
        },
    },
})

export const { name, price, description, clear, isLoading, isError } = formSlice.actions;
export default formSlice.reducer;