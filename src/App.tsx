import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import SuccessfulReset from "./components/SuccessfulReset";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { RootState } from "./states/store";
import Login from "./pages/Login";
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

  const token = useSelector((state: RootState) => state.user);
  console.log(token);

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
