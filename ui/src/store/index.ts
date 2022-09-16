/**
 * Imports
 */
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/reducer';

/**
 * The root store
 */
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

/**
 * Export typed state and dispatch
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;