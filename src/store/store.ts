import { configureStore } from "@reduxjs/toolkit";
import manageReducer from "./manage";

export const store = configureStore({
    reducer: {
        manage: manageReducer,
    },
});

//for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
