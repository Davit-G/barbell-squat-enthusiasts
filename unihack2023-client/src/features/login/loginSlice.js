import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // default state when the app starts up
    loggedIn: true,

    accessToken: "",
    uid: "",
    displayName: "",
};

export const loginSlice = createSlice({
    name: "login", // make sure this name is unique but also the same as the reducer name in store.js
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUserDetails: (state, action) => {
            state.displayName = action.payload.displayName;
            state.accessToken = action.payload.accessToken;
            state.uid = action.payload.uid;
        },
        setLoginFromLocalStorage: (state) => {
            try {
                // get the login information
                const login = localStorage.getItem("state");
                // check if the login information is null
                if (login === null) {
                    // if it is null, then return
                    return;
                }
                // if it is not null, then parse the login information
                const parsedLogin = JSON.parse(login).login;
                // set the state to the parsed login information
                state.loggedIn = parsedLogin.loggedIn;
                state.displayName = parsedLogin.displayName;
                state.accessToken = parsedLogin.accessToken;
                state.uid = parsedLogin.uid;

            } catch (error) {
                console.log(error);
            }
            
        },
       
    },
});

// Action creators are generated for each case reducer function
export const { setLogin, setUserDetails, setLoginFromLocalStorage, setLogout } = loginSlice.actions;

// export the selector
export const selectLogin = (state) => state.login.loggedIn;
export const selectAccessToken = (state) => state.login.accessToken;
export const selectDispayName = (state) => state.login.displayName;
// export const selectUserDetails = (state) => state.login.setUserDetails;
export default loginSlice.reducer;
