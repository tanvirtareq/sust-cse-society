import { Box, Chip, styled } from "@mui/material";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const ChipsArray = (props) => {
    const handleDelete = (chipToDelete) => () => {
        props.setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <>
            {props.chipData.length > 0 &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}
                    component="ul"
                >
                    {props.chipData.map((data) => {
                        return (
                            <ListItem key={data.key}>
                                <Chip
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                />
                            </ListItem>
                        );
                    })}
                </Box>}
        </>


    );
};

export default ChipsArray;