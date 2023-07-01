
import { createTheme} from '@mui/material/styles';


export const theme = createTheme({
    palette:{
        primary:{main:"#ED7D31",contrastText:"#fff"}
    },
    components: {
        // Name of the component
        MuiDivider: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              marginBottom: 4,
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "#D9D9D9",
            },
          },
        },
      },
  });