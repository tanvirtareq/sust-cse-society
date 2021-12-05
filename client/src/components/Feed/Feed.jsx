import { Container, styled} from "@mui/material";
import CardSimplePost from "../CardSimplePost/CardSimplePost";

const ContainerFeed = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    // backgroundColor: 'yellow',
    height: '100%',
    overflow: 'auto',
    
}));

const Feed = () => {
    return (
        <ContainerFeed>
            <CardSimplePost 
            post="ke kovor tomader? Project kotodur? :-)"
            name = "Tanvir Rahman Tareq"
            date="5 December, 2021"  />

            <CardSimplePost 
            post="Amar basa BUET campus. MEOW"
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  />

            <CardSimplePost 
            post="Aaaaaaaaaaaaaaaaaaaaaaa..."
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  /> 
            
            <CardSimplePost 
            post="Seriously?"
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  /> 
            
            <CardSimplePost 
            post=":-)"
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  />


        </ContainerFeed>
    );
};

export default Feed;