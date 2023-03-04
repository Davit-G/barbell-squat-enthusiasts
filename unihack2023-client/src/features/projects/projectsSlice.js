import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // default state when the app starts up
    projects: [],
};

export const projectsSlice = createSlice({
    name: "projects", // make sure this name is unique but also the same as the reducer name in store.js
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        setProjects: (state, action) => {
            state.projects = action.payload.projects;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProject, setProjects } = projectsSlice.actions;

// export the selector
export const getAllProjects = (state) => state.projects.projects;

// export const selectUserDetails = (state) => state.login.setUserDetails;
export default projectsSlice.reducer;
