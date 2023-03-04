import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer
    },
})