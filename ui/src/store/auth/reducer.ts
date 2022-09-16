/**
 * Imports
 */
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

/**
 * Initial State
 */
interface AuthState {
    authetnicatedUser: User,
    isAuthenticated: boolean,
    isAuthenticating: boolean,
    error: string
}

/**
 * Initial State
 */
const initialState: AuthState = {
    authetnicatedUser: {
        username: '',
        email: '',
        roles: []
    },
    isAuthenticated: false,
    isAuthenticating: false,
    error: ''
}

/**
 * Slice
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.error = action.payload.error;
            state.authetnicatedUser = action.payload.user;
            state.isAuthenticated = action.payload.error.length < 1;
        },
        loggedOut: (state, action) => {

        },
        authenticating: (state, action) => {
            state.isAuthenticating = action.payload.isAuthenticating
        }
    }
});

/**
 * Exports
 */
export const { loggedIn, loggedOut, authenticating } = authSlice.actions;
export default authSlice.reducer;