import { InputBase } from "@mui/material";
import { styled } from "@mui/material";

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(${theme.spacing(3)})`,
      paddingRight: `calc(${theme.spacing(3)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    }
  }));
