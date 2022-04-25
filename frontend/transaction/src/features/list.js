import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: [{
            id: "",
            name: "",
            price: "",
            description:"",
            isLoading: false,
            isError: false,
        }],
        isLoading: false,
        isError: false,
    },
    reducers: {
        list: (state, action) => {
            state.list = action.payload;
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        isError: (state, action) => {
            state.isError = action.payload;
        },
    },
})

export const { list, isLoading, isError } = listSlice.actions;
export default listSlice.reducer;