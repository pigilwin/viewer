import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";
import { FileState, RenderableFile, LoadedFiles, PotentiallyLoadedFiles, RenderableFiles } from "types/files";

export const initialState: FileState =  {
    files: null,
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

export const filesLengthSelector = (state: RootState): number => {
    if (state.filesReducer.files === null) {
        return 0;
    }
    const countObject = (specification: LoadedFiles): number => {
        let count: number = specification.files.length;
        if (Object.keys(specification.directories).length > 0) {
            count += Object.keys(specification.directories).reduce((acc, key) => {
                const directories = specification.directories[key];
                let i: number = 0;
                for (const directory of directories) {
                    i += countObject(directory);
                }
                return acc + i;
            }, 0);
        }
        return count;
    };
    return countObject(state.filesReducer.files as LoadedFiles);
};
export const filesSelector = (state: RootState): PotentiallyLoadedFiles => state.filesReducer.files;
export const viewingSelector = (state: RootState): RenderableFile | undefined =>  {
    if (state.filesReducer.files === null) {
        return undefined;
    }
    const findFile = (loadedFiles: LoadedFiles): RenderableFiles => {
        let files: RenderableFiles = {};
        for (const renderableFile of loadedFiles.files) {
            files[renderableFile.key] = renderableFile;
        }
        for (const directories of Object.values(loadedFiles.directories)) {
            for (const directory of directories) {
                files = Object.assign(files, findFile(directory));
            }
        }
        return files;
    };
    const files = findFile(state.filesReducer.files as LoadedFiles);
    return files[state.filesReducer.viewing] || undefined;
};
export const playlistIndexSelector = (state: RootState) => state.filesReducer.playlistIndex;
export const playlistMaxIndexSelector = (state: RootState) => filesLengthSelector(state) - 1;