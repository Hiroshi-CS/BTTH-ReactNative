import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: false
};

export const authReducer = createSlice({
    name: "authReducer",
    initialState: initialState,
    reducers: {
        changeToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { changeToken } = authReducer.actions;