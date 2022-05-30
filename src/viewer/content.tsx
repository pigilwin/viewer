import { useEffect, useState } from "react";
import { LoadedFile } from "types/files";

interface ThumbnailImageProperties {
    file: LoadedFile;
    onClick: () => void;
}
export const ThumbnailImage = ({file, onClick}: ThumbnailImageProperties): JSX.Element | null => {
    
    const [stateUrl, setStateUrl] = useState<string>('');

    useEffect(() => {

        let url = '';

        const createBlob = async (): Promise<Blob> => {
            return await (await fetch(file.thumbnail)).blob();
        };

        createBlob().then(blob => {
            url = URL.createObjectURL(blob);
            setStateUrl(url);
        });

        return () => {
            URL.revokeObjectURL(url);
            setStateUrl('');
        }
    }, [file]);

    if (stateUrl.length === 0) {
        return (<LoadingIcon/>);
    }

    return (
        <img onClick={onClick} className="object-scale-down" alt={file.key} src={stateUrl} />
    );
}

interface ContentViewerProperties {
    file: LoadedFile;
}
export const ContentViewer = ({file}: ContentViewerProperties): JSX.Element => {

    const [stateUrl, setStateUrl] = useState<string>('');

    useEffect(() => {

        let url = '';

        const createBlob = async (): Promise<Blob> => {
            return await (await fetch(file.content)).blob();
        };

        createBlob().then(blob => {
            url = URL.createObjectURL(blob);
            setStateUrl(url);
        });

        return () => {
            URL.revokeObjectURL(url);
            setStateUrl('');
        }
    }, [file]);

    if (stateUrl.length === 0) {
        return (<LoadingIcon/>);
    }

    if (file.isVideo) {
        return (
            <div className="flex flex-col items-center min-h-screen justify-center">
                <video autoPlay className="object-scale-down object-center block" src={stateUrl}></video>    
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <img className="object-scale-down object-center block" alt={file.key} src={stateUrl} />
        </div>
    );
    
};

export const LoadingIcon = () => {
    return (
        <svg className="animate-spin" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="m10.5 3.5v2"/>
                <path d="m15.5 5.5-1.5 1.5"/>
                <path d="m5.5 5.5 1.5 1.5"/>
                <path d="m10.5 17.5v-2"/>
                <path d="m15.5 15.5-1.5-1.5"/>
                <path d="m5.5 15.5 1.5-1.5"/>
                <path d="m3.5 10.5h2"/>
                <path d="m15.5 10.5h2"/>
            </g>
        </svg>
    );
};