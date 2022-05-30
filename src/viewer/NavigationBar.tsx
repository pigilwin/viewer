import { useSelector, useDispatch } from "react-redux";
import { filesLengthSelector, storeFiles, loadFile } from "store/files/fileSlice";
import { getFilesFromDirectory } from 'lib/files';

interface NavigationBarProperties {
    hasLoadedFile: boolean;
}
export const NavigationBar = ({hasLoadedFile}: NavigationBarProperties): JSX.Element => {

    const files = useSelector(filesLengthSelector);
    const dispatch = useDispatch();
    const loadedWithFiles: JSX.Element[] = [];

    const openFilesClickHandler = async () => {
        const directoryHandler = await window.showDirectoryPicker();
        const files = await getFilesFromDirectory(directoryHandler);
        dispatch(storeFiles(files));
    };

    const playlistClickHandler = () => {

    };

    if (files > 0) {
        loadedWithFiles.push(
            <p key="0">The amount of files found are {files}</p>
        );
        loadedWithFiles.push(<PlayButton key={1} onClick={playlistClickHandler}/>);
    }

    if (hasLoadedFile) {
        const closeFileClickHandler = () => {
            dispatch(loadFile(''));
        };
        loadedWithFiles.push(
            <button key={2} className="bg-red-400 p-2 text-center cursor-pointer rounded-md" onClick={closeFileClickHandler}>Close File</button>
        );
    }

    return (
        <nav className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white shadow sm:shadow-none">
            <h1 className="text-2xl">Viewer</h1>
            {loadedWithFiles}
            <button className="bg-cyan-400 p-2 text-center cursor-pointer rounded-md" onClick={openFilesClickHandler}>Open Files</button>
        </nav>
    );
};

interface PlayButtonProperties {
    onClick: () => void;
}
export const PlayButton = ({onClick}: PlayButtonProperties): JSX.Element => {
    return (
        <svg className="cursor-pointer" onClick={onClick} height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 5)">
                <path d="m2.49368982.53498937 11.99999998-.03787142c1.0543566-.00331643 1.9207298.80983192 2.0003436 1.84444575l.0059666.15555425v6.00288205c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-5.96502059c0-1.10210602.89158929-1.9965128 1.99368982-1.99999004z"/>
                <path d="m7.5 7.5 3-2-3-2z" fill="currentColor"/>
            </g>
        </svg>
    );
};