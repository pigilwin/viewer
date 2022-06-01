import { LoadedFiles, Size } from 'types/files';

export const getFilesFromDirectory = async (directoryHandler: FileSystemDirectoryHandle): Promise<LoadedFiles> => {
    return new Promise<LoadedFiles>(async (resolve) => {
        const loadFilesFromDirectory = async (directoryHandler: FileSystemDirectoryHandle): Promise<LoadedFiles> => {
            const specification: LoadedFiles = {
                files: [],
                directories: {}
            };
            for await (const [key, value] of directoryHandler.entries()) {
                if (value.kind === 'directory') {
                    specification.directories[value.name] = await loadFilesFromDirectory(value);
                    continue;
                }

                const file = await value.getFile();
    
                if (file.type.length === 0) {
                    continue;
                }
    
                const isVideo = file.type.includes('video');
                const content = await blobToString(file);
                const thumbnailBlob = await createThumbnail(file, isVideo);

                specification.files.push({
                    key: deriveKey(key, directoryHandler.name),
                    isVideo: isVideo,
                    content: content,
                    thumbnail: await blobToString(thumbnailBlob),
                    fileType: file.type,
                    size: await generateSize(thumbnailBlob),
                });
            }

            specification.files.sort(() => {
                return Math.random() - 0.5;
            });

            return specification;
        };

        const files: LoadedFiles = await loadFilesFromDirectory(directoryHandler);
        resolve(files);
    });
}

const createThumbnail = (blob: Blob, isVideo: boolean): Promise<Blob> => {
    return new Promise<Blob>((resolve) => {
        /**
         * If this file is not a video then the 
         * thumbnail is the same as the file
         */
        if (!isVideo) {
            resolve(blob);
            return;
        }

        /**
         * We are going to take a snapshot of the video
         * using the canvas API
         */
        const video = document.createElement('video');
        const urlOfVideo = URL.createObjectURL(blob);

        /**
         * Listen for the loadedmetadata event,
         * this will only fire once the video 
         * has been loaded
         */
        video.addEventListener('loadedmetadata', () => {

            /**
             * When the video has seeked to 
             * the correct position
             */
            video.addEventListener('seeked', () => {
                /**
                 * Create a canvas the same size as the video
                 * player
                 */
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d') as CanvasRenderingContext2D;

                /**
                 * Draw the image from the video on to the canvas
                 */
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                /**
                 * Convert the canvas to a blob and resolve 
                 * the promise whilst cleaning up the elements
                 */
                context.canvas.toBlob(async (blob) => {
                    canvas.remove();
                    video.remove();
                    URL.revokeObjectURL(urlOfVideo);
                    resolve(blob as Blob);
                }, "image/jpeg", 1);
            });

            /**
             * Take the current duration of the video
             * and divide it by 2 to get the middle
             * 
             * Then seek the video to that current timestamp
             */
            video.currentTime = video.duration / 2;
        });

        /**
         * Set the video url and load the video
         */
        video.src = urlOfVideo;
        video.load();
    });
}

const generateSize = (blob: Blob): Promise<Size> => {
    return new Promise<Size>((resolve) => {
        const documentFragment = document.createDocumentFragment();
        const image = document.createElement('img');
        const url = URL.createObjectURL(blob);
        image.addEventListener('load', () => {
            URL.revokeObjectURL(url);
            resolve({
                height: image.height,
                width: image.width
            });
        });
        image.src = url;
        documentFragment.appendChild(image);
    });
}

const blobToString = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            resolve(reader.result as string);
        });
        reader.readAsDataURL(blob);
    });
};

const deriveKey = (key: string, directory: string): string => {
    return [directory, key].join('-');
}