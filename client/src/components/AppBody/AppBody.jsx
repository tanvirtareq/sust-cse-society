import { Grid } from "@mui/material";
//import Feed from "../Feed/Feed";
import LeftBar from "../LeftBar/LeftBar";
//import PollEventPage from "../Voting/User/PollEventPage";
//import {Route, Routes} from "react-router-dom";

import "./styles.css";
// import Feed from "../Feed/Feed";
// import CreatePollPage from "../Voting/Admin/CreatePollPage";
// import ManagePollPage from "../Voting/Admin/ManagePollPage";

const AppBody = (props) => {
    const {component} = props;
    return (
        <Grid container height={'100vh'} >
            <Grid item xs={2} borderRight= '1px solid #A9A9A9'>
                <LeftBar />
            </Grid>
            
            <Grid item className="grid-scroll" xs={10}>
                {/* <Feed /> */}
                {/* <PollEventPage /> */}

                
                {component}
                
            </Grid>
        </Grid>
    );
}

export default AppBody;