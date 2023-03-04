import { configureStore } from '@reduxjs/toolkit'

import { saveState, loadState } from './localStorage'
import { debounce } from "lodash";
import { setLoginFromLocalStorage } from '../features/login/loginSlice';

import loginReducer from '../features/login/loginSlice'
import projectsReducer from '../features/projects/projectsSlice';
import backendReducer from "../features/backend/backendSlice"

// the throttled saveState function, makes sure that too many writes to local storage are not made
// for perforamnce reasons bruh
// from dave!
const debouncedLocalStorageMiddleware = debounce((store, next, action) => {
    saveState(store.getState())
}, 2000)

// middleware to save to local storage
const localStorageMiddleware = store => next => action => {
    let result = next(action)
    debouncedLocalStorageMiddleware(store, next, action)
    return result
}
// i forgor what this does
const enableOnDev = process.env.NODE_ENV === "development"

// make sure that redux store is configured to save to local storage
export const store = configureStore({
    reducer: {
        login: loginReducer,
        projects: projectsReducer,
        backend: backendReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
    devTools: enableOnDev
})

// load the state from local storage
const persistedState = loadState()
if (persistedState) {
    store.dispatch(setLoginFromLocalStorage())
}