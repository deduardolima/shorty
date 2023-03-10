import React from "react";
import { Router } from "./routes/Router"
import theme from "./constants/theme";
import { ThemeProvider } from "@mui/material";
import GlobalState from "./Global/GlobalState";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalState>
        <Router />
      </GlobalState>
    </ThemeProvider >

  );
}

export default App;
