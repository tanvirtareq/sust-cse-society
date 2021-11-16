import { useEffect } from "react";

import { Container,  Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts.js'
import Form from "../Form/Form.js";
import { useDispatch } from "react-redux";
import {getPosts} from '../../actions/posts'



function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7} >
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
