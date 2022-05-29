export {}
/**
    const render = () => {
        const promise = file.isVideo ? createVideo(file) : createImage(file);
        promise.then(() => {
            render();
        }).catch((err) => {
            console.error(err);
        });
    };
    **/


    /**
     * Create a image element and load the image, wait 5 seconds and then resolve
     *
     const createImage = (file: LoadedFile): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const url = URL.createObjectURL(file.content);
            const img = createImageElement();
            img.src = url;
            document.body.appendChild(img);

            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(img);
                resolve();
            }, 5000);
        });
    };

    /**
     * Create a video element and load the video, play the video and then resolve
     *
    const createVideo = (file: LoadedFile): Promise<void> => {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(file.content);
            const video = createVideoElement();
            video.src = url;
            video.addEventListener('ended', () => {
                URL.revokeObjectURL(url);
                document.body.removeChild(video);
                resolve();
            });
            document.body.appendChild(video);
            video.play();
        });
    };
    */