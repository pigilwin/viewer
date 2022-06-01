export interface Size {
    width: number;
    height: number;
}

export interface RenderableFile {
    key: string;
    content: string;
    thumbnail: string;
    fileType: string;
    isVideo: boolean;
    size: Size;
}

export type RenderableFiles = RenderableFile[];

export interface Directories {
    [key: string]: LoadedFiles;
}

export interface LoadedFiles {
    files: RenderableFiles;
    directories: Directories;
}

export type PotentiallyLoadedFiles = LoadedFiles | null;

export interface RenderableMap {
    [key: string]: RenderableFile;
}

export interface FileState {
    files: PotentiallyLoadedFiles;
    viewing: string;
}