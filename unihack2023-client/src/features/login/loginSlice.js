import { createSlice } from '@reduxjs/toolkit'

const initialState = { // default state when the app starts up
    loggedIn: true,
}

export const loginSlice = createSlice({
    name: 'login', // make sure this name is unique but also the same as the reducer name in store.js
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.loggedIn = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = loginSlice.actions

// export the selector
export const selectLogin = state => state.login.loggedIn

export default loginSlice.reducer