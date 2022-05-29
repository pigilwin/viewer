import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";
import { FileState, LoadedFiles } from "types/files";

export const initialState: FileState =  {
    files: [],
};

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        storeFiles: (state: FileState, action: PayloadAction<LoadedFiles>) => {
            return {
                files: action.payload
            };
        }
    }
});

export const reducer = filesSlice.reducer;
export const {
    storeFiles
} = filesSlice.actions;

export const filesLength = (state: RootState): number => state.filesReducer.files.length;