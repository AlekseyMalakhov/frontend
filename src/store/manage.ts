import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

export const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            //we are allowed to write "mutating" logic in reducers
            // Immer library detect changes and produces a new immutable state
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = manageSlice.actions;
export default manageSlice.reducer;
