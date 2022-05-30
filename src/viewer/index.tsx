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

    if (loadedFile !== undefined) {
        return (
            <div className="min-h-screen">
                <NavigationBar hasLoadedFile={true}/>
                <ContentViewer file={loadedFile}/>
            </div>
        );
    }

    if (playlistIndex !== null) {
        return (
            <div className="min-h-screen">
                <NavigationBar hasLoadedFile={false}/>
                <PlaylistViewer index={playlistIndex}/>
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