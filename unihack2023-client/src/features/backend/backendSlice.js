
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: ( import.meta.env.PROD ? "https://oxford-clean.bnr.la:4269" : "http://localhost:8000"),
}

export const backendSlice = createSlice({
    name: "backend",
    initialState,
    reducers: {
        setBackend: (state, action) => {
            state.backend.url = action.payload;
        }
    }
});

export const { setBackend } = backendSlice.actions;

export const selectBackend = (state) => state.backend.url;

export default backendSlice.reducer;