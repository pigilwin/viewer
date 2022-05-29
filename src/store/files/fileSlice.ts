import { createSlice } from "@reduxjs/toolkit";
import { FileState } from "types/files";

export const initialState: FileState =  {
    files: [],
};

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        
    }
});

export const reducer = filesSlice.reducer;
export const {
} = filesSlice.actions;