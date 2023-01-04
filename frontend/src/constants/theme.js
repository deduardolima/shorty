import { createTheme } from '@mui/material/styles';
import { primaryColor, neutralColor } from './colors';
import { red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor

    },
    secondary: {
      main: neutralColor,
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;