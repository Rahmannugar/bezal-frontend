import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4385F5",
        light: "#FFFFFF",
        dark: "#000000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
