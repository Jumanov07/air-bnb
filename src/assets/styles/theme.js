import { createTheme } from '@mui/material';

export const theme = createTheme({
   typography: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
   },
   components: {
      MuiButton: {
         defaultProps: {
            sx: {
               fontFamily: 'Inter',
               fontStyle: 'normal',
            },
         },
      },
   },
});
