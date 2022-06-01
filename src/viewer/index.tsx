import { useSelector } from "react-redux";
import { filesSelector, viewingSelector } from "store/files/fileSlice";
import { LoadedFiles } from "types/files";
import { ContentViewer } from "./content";
import { Grid } from "./grid";
import { NavigationBar } from "./NavigationBar";

 export const Viewer = (): JSX.Element => {

    const files = useSelector(filesSelector);
    const loadedFile = useSelector(viewingSelector);

    let content: JSX.Element | null = null;
    let hasLoadedFile: boolean = false;

    if (loadedFile !== undefined) {
        content = <ContentViewer file={loadedFile} />;
        hasLoadedFile = true;
    } else if (files !== undefined) {
        content = <Grid files={files as LoadedFiles}/>;
    }

    return (
        <div className="wrapper">
            <NavigationBar hasLoadedFile={hasLoadedFile}/>
            <div className="max-h-screen">
                {content}
            </div>
        </div>
    );
};