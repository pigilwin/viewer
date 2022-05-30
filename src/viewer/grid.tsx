import { LoadedFiles } from "types/files";
import { ThumbnailImage } from "./content";

interface GridProperties {
    files: LoadedFiles;
}
export const Grid = ({files}: GridProperties): JSX.Element => {
    const elements: JSX.Element[] = [];
    for (const file of files) {
        elements.push(
            <ThumbnailImage key={file.key} file={file}/>
        );
    }
    return (
        <div className="grid grid-cols-8 gap-4">
            {elements}
        </div>
    );
};