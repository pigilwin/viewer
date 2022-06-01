import { useDispatch } from "react-redux";
import { loadFile } from "store/files/fileSlice";
import { LoadedFiles, RenderableFiles, Size } from "types/files";
import { Accordion } from "./accordion";
import { ThumbnailImage } from "./content";

interface GridProperties {
    tree: LoadedFiles;
    title: string;
}
/**
 * Recursively build the folder tree
 */
export const RecursiveBuilder = ({tree, title}: GridProperties): JSX.Element => {
    const elements: JSX.Element[] = [];
    let i: number = 0;
    /**
     * Interate over the files and build the tree
     */
    for (const [directoryTitle, value] of Object.entries(tree.directories)) {
        /**
         * If we have files within the directory we can append the accordion grid
         * to the elements to return
         */
        if (value.files.length > 0) {
            elements.push(<AccordionGrid key={i} title={directoryTitle} files={value.files}/>);
        }
        i++;
        /**
         * If we have any directories within the directory we can append the recursive
         * builder to the elements to build the tree
         */
        const entries = Object.entries(value.directories);
        if (entries.length > 0) {
            let k: number = 0;
            const innerElements: JSX.Element[] = [];
            for (const [key, value] of entries) {
                innerElements.push(<RecursiveBuilder title={key} key={k} tree={value}/>);
                k++;
            }
            elements.push(<Accordion key={i} title={directoryTitle}>{innerElements}</Accordion>);
            i++;
        }
    };
    /**
     * If we have any files within the directory we are building
     * then append them to the end of the accoridon
     */
    if (tree.files.length) {
        elements.push(<AccordionGrid key={i} title={title} files={tree.files}/>);
    }
    return (<div className="mt-2">{elements}</div>);
};

interface AccordionGridProperties {
    files: RenderableFiles;
    title: string;
}
const AccordionGrid = ({files, title}: AccordionGridProperties): JSX.Element => {
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

    const child = (
        <div className="grid grid-cols-4 gap-4">
            {elements}
        </div>
    );

    return <Accordion title={title}>
        {child}
    </Accordion>
};