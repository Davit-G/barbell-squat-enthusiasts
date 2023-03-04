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
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setUserDetails } = loginSlice.actions;

// export the selector
export const selectLogin = (state) => state.login.loggedIn;
export const selectAccessToken = (state) => state.login.accessToken;
export const selectDispayName = (state) => state.login.displayName;
// export const selectUserDetails = (state) => state.login.setUserDetails;
export default loginSlice.reducer;
