import { useDispatch } from "react-redux";
import { loadFile } from "store/files/fileSlice";
import { LoadedFiles, Size } from "types/files";
import { ThumbnailImage } from "./content";

interface GridProperties {
    files: LoadedFiles;
}
export const Grid = ({files}: GridProperties): JSX.Element => {
    const dispatch = useDispatch();
    const elements: JSX.Element[] = [];

    
    /**
     * Sort the files randomly
    */
    const sortedFiles = Array.from(files);
    const length = (image: Size) => Math.sqrt(
        Math.pow(image.width, 2) +
        Math.pow(image.height, 2)
    );
    sortedFiles.sort((first, second) => {
        return length(first.size) - length(second.size);
    });

    for (const file of files) {
        const onClickHandler = (): void => {
            dispatch(loadFile(file.key));
        }
        elements.push(
            <ThumbnailImage onClick={onClickHandler} key={file.key} file={file}/>
        );
    }
    return (
        <div className="grid grid-cols-8 gap-4">
            {elements}
        </div>
    );
};