import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SuccessfulReset from "./components/SuccessfulReset";
import Home from "./pages/Home";
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
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
