import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import SuccessfulReset from "./components/SuccessfulReset";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./states/store";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import axios from "axios";
import { resetUser } from "./states/userSlice";
import Post from "./pages/Post";
import Friends from "./pages/Friends";
import NewPassword from "./pages/NewPassword";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  //verify token
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(`${backendURL}/verify/${user._id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          // console.log(response.data);
        }
      } catch (error) {
        dispatch(resetUser());
        //console.log("log out");
        alert("Session has expired");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    //checking every hour
    const intervalId = setInterval(() => {
      checkToken();
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);

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
        <Route path={`/${user?.userName}`} element={<UserProfile />} />
        {/* Other user's profile by username */}
        <Route path={`/users/:userName`} element={<Profile />} />
        {/* single post */}
        <Route path={`/posts/:postId`} element={<Post />} />
        <Route path={`/${user?.userName}/friends`} element={<Friends />} />
        <Route path="/forgotPassword" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<NewPassword />}></Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
