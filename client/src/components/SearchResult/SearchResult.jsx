import { Container, styled } from "@mui/material";

const SearchResultContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto'
}));

const SearchResult = () => {
    return (
        <SearchResultContainer>

        </SearchResultContainer>
    );
}

export default SearchResult;