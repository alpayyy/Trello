import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ab003c',
        },
        secondary: {
            main: '#e0e0e0',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#ffffff',
        },
        customBlack: {
            main: "#000000",
        },
    },
    typography: {
        fontFamily: 'Arial', 
    },
});

export default theme;
