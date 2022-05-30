import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filesSelector, loadPlaylist } from "store/files/fileSlice";
import { LoadingIcon } from "./content";

interface PlaylistViewerProperties {
    index: number;
}
export const PlaylistViewer = ({index}: PlaylistViewerProperties): JSX.Element => {
    const dispatch = useDispatch();
    const files = useSelector(filesSelector);
    const file = files[index];
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

    const nextFileHandler = () => {
        let indexToLoad = index + 1;
        if (files[indexToLoad] === undefined) {
            indexToLoad = 0;
        }

        /**
         * If we are loading a video then we 
         * can just schedule the next call
         */
        if (file.isVideo) {
            dispatch(loadPlaylist(indexToLoad));
            return;
        }

        /**
         * If we are an image then load the next image after 5 seconds
         */
        setTimeout(() => {
            dispatch(loadPlaylist(indexToLoad));
        }, 5000);
    };

    if (file.isVideo) {
        return (
            <div className="flex flex-col items-center min-h-screen max-h-screen justify-center">
                <video autoPlay className="object-scale-down object-center block" src={stateUrl} onEnded={nextFileHandler}></video>    
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen max-h-screen justify-center">
            <img className="object-scale-down object-center block" alt={file.key} src={stateUrl} onLoad={nextFileHandler} />
        </div>
    );
};