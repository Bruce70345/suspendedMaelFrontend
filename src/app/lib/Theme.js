"use client"

import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors'; // 導入 teal 顏色

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: {
            main: '#80cbc4',
        },
    },

});

export default theme;
