import React, { useState } from "react";
import { createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { ThemeProvider } from "@mui/material/styles";
import EmbeddedComponent from "./FlutterView/EmbeddedComponent";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Define light and dark themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const appTheme = darkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Flutter Element Embedding POC
            </Typography>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="theme"
              onClick={toggleTheme}
            >
              <Brightness4Icon sx={{ fontSize: 28 }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <EmbeddedComponent></EmbeddedComponent>
      </Box>
    </ThemeProvider>
  );
}

export default App;
