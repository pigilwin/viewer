export interface Size {
    width: number;
    height: number;
}

export interface LoadedFile {
    key: string;
    content: string;
    thumbnail: string;
    fileType: string;
    isVideo: boolean;
    size: Size;
}
export type LoadedFiles = Array<LoadedFile>;

export interface FileState {
    files: LoadedFiles;
}