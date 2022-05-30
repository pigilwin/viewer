import { useEffect, useState } from "react";
import { LoadedFile } from "types/files";

interface ThumbnailImageProperties {
    file: LoadedFile;
    onClick: () => void;
}
export const ThumbnailImage = ({file, onClick}: ThumbnailImageProperties): JSX.Element | null => {
    
    const [image, setImage] = useState<string>('');

    useEffect(() => {

        const createBlob = async (): Promise<Blob> => {
            return await (await fetch(file.thumbnail)).blob();
        };

        createBlob().then(blob => {
            const url = URL.createObjectURL(blob);
            setImage(url);
        });

        return () => {
            //URL.revokeObjectURL(image);
            //setImage('');
        }
    }, [file, image]);

    if (image.length === 0) {
        return null;
    }

    return (
        <img onClick={onClick} className="object-scale-down" alt={file.key} src={image} />
    );
}

interface ContentViewerProperties {
    file: LoadedFile;
}
export const ContentViewer = ({file}: ContentViewerProperties): JSX.Element => {

    const [url, setUrl] = useState<string>('');

    useEffect(() => {

        const createBlob = async (): Promise<Blob> => {
            return await (await fetch(file.thumbnail)).blob();
        };

        createBlob().then(blob => {
            const url = URL.createObjectURL(blob);
            setUrl(url);
        });
    }, [file, url]);

    const parts: JSX.Element[] = [];
    if (file.isVideo) {

    } else {
        parts.push(
            <img className="object-scale-down" alt={file.key} src={url} />
        );
    }
    return (
        <div>
            {parts}
        </div>
    );
};