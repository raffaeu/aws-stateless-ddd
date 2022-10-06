/**
 * Imports
 */
import { createSlice } from "@reduxjs/toolkit";
import { KnwonError } from "../types";
import { authenticateUser } from "./actions";
import { User } from "./types";

/**
 * Initial State
 */
interface AuthState {
    authenticatedUser: User | null,
    status: 'failed' | 'loading' | 'loggedIn' | 'loggedOut',
    error: KnwonError
}

/**
 * Initial State
 */
const initialState: AuthState = {
    authenticatedUser: {
        username: '',
        email: '',
        roles: [],
        token: ''
    },
    status: 'loggedOut',
    error: {
        errorTitle: '',
        errorMessage: ''
    }
}

/**
 * Slice
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // loading authentication
        builder.addCase(authenticateUser.pending, (state) => {
            state.status = 'loading';
        });

        // success authentication
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error.errorTitle = action.payload ? action.payload.errorTitle : 'Unknown error';
            state.error.errorMessage = action.payload ? action.payload.errorMessage : 'Unknown error';
        });

        // failed authentication
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.status = 'loggedIn';
        });
    }
});

/**
 * Exports
 */
export default authSlice.reducer;