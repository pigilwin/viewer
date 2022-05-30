import { useSelector } from "react-redux";
import { filesSelector, viewingSelector } from "store/files/fileSlice";
import { Grid } from "./grid";
import { NavigationBar } from "./NavigationBar";

 export const Viewer = (): JSX.Element => {

    const files = useSelector(filesSelector);
    const loadedFile = useSelector(viewingSelector);

    if (loadedFile !== undefined) {
        return (
            <div>
                <NavigationBar />
                
            </div>
        );
    }

    return (
        <div>
            <NavigationBar />
            <Grid files={files}/>
        </div>
    );
};