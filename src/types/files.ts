export interface Size {
    width: number;
    height: number;
    length: () => number;
}

export interface LoadedFile {
    key: string;
    content: Blob;
    thumbnail: Blob;
    fileType: string;
    isVideo: boolean;
    size: Size;
}
export type LoadedFiles = Array<LoadedFile>;

export interface FileState {
    files: LoadedFiles;
}