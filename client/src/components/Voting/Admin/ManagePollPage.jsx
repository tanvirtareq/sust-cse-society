import { Button, Container, styled, Typography } from "@mui/material";

const ManagePollContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto',
    marginLeft: theme.spacing(8)
}));

const ManagePollPage = () => {
    return (
        <ManagePollContainer>
            <Typography variant="h4">Title goes here</Typography>
            <Typography variant="body">Description goes here</Typography>
            <br /> <br />
            <Button variant="contained">start/end poll</Button>
        </ManagePollContainer>
    );

};

export default ManagePollPage;