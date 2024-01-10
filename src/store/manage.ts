import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types/item";

interface State {
    loading: boolean;
    itemToBuy: Item | null;
}

const initialState: State = {
    loading: false,
    itemToBuy: null,
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
        setItemToBuy: (state, action: PayloadAction<Item | null>) => {
            state.itemToBuy = action.payload;
        },
    },
});

export const { setLoading, setItemToBuy } = manageSlice.actions;
export default manageSlice.reducer;
