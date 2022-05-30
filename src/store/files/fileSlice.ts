import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";
import { FileState, LoadedFile, LoadedFiles } from "types/files";

export const initialState: FileState =  {
    files: [],
    viewing: '',
    playlistIndex: null
};

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        storeFiles: (state: FileState, action: PayloadAction<LoadedFiles>) => {
            return {
                files: action.payload,
                viewing: '',
                playlistIndex: null
            };
        },
        loadFile: (state: FileState, action: PayloadAction<string>) =>{
            return {
                files: state.files,
                viewing: action.payload,
                playlistIndex: null
            };
        },
        loadPlaylist: (state: FileState, action: PayloadAction<number | null>) => {
            return {
                files: state.files,
                viewing: '',
                playlistIndex: action.payload 
            };
        }
    }
});

export const reducer = filesSlice.reducer;
export const {
    storeFiles,
    loadFile,
    loadPlaylist
} = filesSlice.actions;

export const filesLengthSelector = (state: RootState): number => state.filesReducer.files.length;
export const filesSelector = (state: RootState): LoadedFiles => state.filesReducer.files;
export const viewingSelector = (state: RootState): LoadedFile | undefined => state.filesReducer.files.find((loadedFile) => {
    return state.filesReducer.viewing === loadedFile.key;
});
export const playlistIndexSelector = (state: RootState) => state.filesReducer.playlistIndex;
export const playlistMaxIndexSelector = (state: RootState) => state.filesReducer.files.length - 1;