import { useSelector } from "react-redux";
import { filesSelector, viewingSelector, playlistIndexSelector } from "store/files/fileSlice";
import { ContentViewer } from "./content";
import { Grid } from "./grid";
import { NavigationBar } from "./NavigationBar";
import { PlaylistViewer } from "./PlaylistViewer";

 export const Viewer = (): JSX.Element => {

    const files = useSelector(filesSelector);
    const loadedFile = useSelector(viewingSelector);
    const playlistIndex = useSelector(playlistIndexSelector);

    let content: JSX.Element | null = null;
    let hasLoadedFile: boolean = false;

    if (loadedFile !== undefined) {
        content = <ContentViewer file={loadedFile} />;
        hasLoadedFile = true;
    } else if (playlistIndex !== null) {
        content = <PlaylistViewer index={playlistIndex}/>;
    } else {
        content = <Grid files={files}/>;
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