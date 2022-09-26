import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import purpleTheme from "./theme";

type Props = {
  children: JSX.Element;
};

const AppTheme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
