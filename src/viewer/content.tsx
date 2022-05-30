import { useEffect, useState } from "react";
import { LoadedFile } from "types/files";

interface ThumbnailImageProperties {
    file: LoadedFile;
}
export const ThumbnailImage = ({file}: ThumbnailImageProperties): JSX.Element | null => {
    
    const [image, setImage] = useState<string>('');

    useEffect(() => {

        const createBlob = async (): Promise<Blob> => {
            return await (await fetch(file.thumbnail)).blob();
        };

        createBlob().then(blob => {
            const url = URL.createObjectURL(blob);
            setImage(url);
        });
    }, [file, image]);

    if (image.length === 0) {
        return null;
    }

    return (
        <img className="object-scale-down" alt={file.key} src={image} />
    );
}