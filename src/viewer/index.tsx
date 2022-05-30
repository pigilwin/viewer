import { useSelector } from "react-redux";
import { filesSelector, viewingSelector } from "store/files/fileSlice";
import { ContentViewer } from "./content";
import { Grid } from "./grid";
import { NavigationBar } from "./NavigationBar";

 export const Viewer = (): JSX.Element => {

    const files = useSelector(filesSelector);
    const loadedFile = useSelector(viewingSelector);

    if (loadedFile !== undefined) {
        return (
            <div className="min-h-screen">
                <NavigationBar hasLoadedFile={true}/>
                <ContentViewer file={loadedFile}/>
            </div>
        );
    }

    return (
        <div>
            <NavigationBar hasLoadedFile={false}/>
            <Grid files={files}/>
        </div>
    );
};