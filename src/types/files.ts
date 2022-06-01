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

export interface Directories {
    [key: string]: LoadedFiles;
}

export interface LoadedFiles {
    files: RenderableFile[];
    directories: Directories;
}

export type PotentiallyLoadedFiles = LoadedFiles | null;

export interface RenderableFiles {
    [key: string]: RenderableFile;
}

export interface FileState {
    files: PotentiallyLoadedFiles;
    viewing: string;
}