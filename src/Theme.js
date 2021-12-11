import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#463750',
    },
    secondary: {
      main: '#f44f1f'
    }
  }
}))

