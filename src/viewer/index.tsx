import { useSelector } from "react-redux";
import { filesSelector } from "store/files/fileSlice";
import { Grid } from "./grid";
import { NavigationBar } from "./NavigationBar";

 export const Viewer = (): JSX.Element => {

    const files = useSelector(filesSelector);

    return (
        <div>
            <NavigationBar />
            <Grid files={files}/>
        </div>
    );
};