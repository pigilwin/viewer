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

    if (files > 0) {
        loadedWithFiles.push(
            <p key="0">The amount of files found are {files}</p>
        );
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
        <nav className="flex flex-row w-full justify-between items-center px-4 py-1 bg-white shadow">
            <h1 className="text-2xl">Viewer</h1>
            {loadedWithFiles}
            <button className="bg-cyan-400 p-2 text-center cursor-pointer rounded-md" onClick={openFilesClickHandler}>Open Files</button>
        </nav>
    );
};