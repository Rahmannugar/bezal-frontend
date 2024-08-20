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
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4385F5",
        light: "#FAFAFA",
        dark: "#000000",
      },
    },
  });

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        {/* Logged-in user's profile */}
        <Route path={`/${user.userName}`} element={<UserProfile />} />
        {/* Other user's profile by username */}
        <Route path={`/users/:userName`} element={<Profile />} />
        <Route path="/forgotPassword" element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
