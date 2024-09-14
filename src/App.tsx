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
import { useEffect, useState } from "react";
import axios from "axios";
import { resetUser } from "./states/userSlice";
import Post from "./pages/Post";
import Friends from "./pages/Friends";
import NewPassword from "./pages/NewPassword";
import ChatPage from "./pages/ChatPage";
import Notifications from "./pages/Notifications";
import GridLoader from "react-spinners/GridLoader";
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

  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const mode = useSelector((state: RootState) => state.user.mode);
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

    //hide loading menu
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    //checking every hour
    const intervalId = setInterval(() => {
      checkToken();
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);
  const navigateHome = () => {
    navigate("/");
  };

  const navigateNotification = () => {
    navigate("/notifications");
  };
  const navigateChat = () => {
    navigate(`/chat`);
  };

  const navigateProfile = () => {
    navigate(`/${user?.userName}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        {isLoading ? (
          <div
            className={`flex justify-center h-screen  items-center ${
              mode ? "bg-white" : "bg-black"
            }`}
          >
            <GridLoader color={`${mode ? "black" : "white"}`} />
          </div>
        ) : (
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
            <Route path="/verifypassword" element={<SuccessfulReset />} />
            <Route path="/reset-password/:token" element={<NewPassword />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:userName" element={<ChatPage />} />
          </Routes>
        )}

        {isLoggedIn ? (
          <div
            className={` ${
              mode ? "bg-black" : "bg-[#4385F5]"
            } fixed bottom-0 left-0 md:hidden z-50 w-full h-20  border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
          >
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
              <button
                onClick={navigateHome}
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Home
                </span>
              </button>
              <button
                onClick={navigateNotification}
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <div className="flex justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:fill-[#4385F5] fill-[#AAAAAA]"
                  >
                    <circle cx="20" cy="20" r="20" fill="#FAFAFA" />
                    <path
                      d="M30.3114 25.5829L27.738 21.9417V14.8281C27.738 11.1973 25.0508 8.18269 21.5608 7.66783V6.06099C21.5608 5.47504 21.0857 5 20.4998 5C19.9139 5 19.4389 5.47504 19.4389 6.06099V7.66777C15.9489 8.18264 13.2616 11.1972 13.2616 14.828V21.9417L10.6882 25.5829C10.1928 26.2837 10.6945 27.2562 11.5546 27.2562H29.4451C30.3033 27.2563 30.8079 26.2852 30.3114 25.5829Z"
                      fill=""
                    />
                    <path
                      d="M20.4999 28.0138C18.8495 28.0138 17.5068 29.3564 17.5068 31.0068C17.5068 32.6572 18.8496 34 20.4999 34C22.1503 34 23.4929 32.6572 23.4929 31.0069C23.4929 29.3565 22.1502 28.0138 20.4999 28.0138Z"
                      fill=""
                    />
                  </svg>
                  {user.readNotifications ? (
                    ""
                  ) : (
                    <div className="bg-red-500 rounded-full w-2 h-2"></div>
                  )}
                </div>
                <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Notifications
                </span>
              </button>

              <button
                onClick={navigateChat}
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`group-hover:fill-[#4385F5] ${
                    mode ? "fill-[#FFFFFF]" : "fill-[#FFFFFF]"
                  }`}
                >
                  <g clip-path="url(#clip0_1_358)">
                    <path
                      d="M19.1326 17.2236C18.559 16.9973 18.0576 16.6081 17.6959 16.1015C19.1124 15.1443 20.0001 13.7723 20.0001 12.2479C20.0001 10.5798 18.9373 9.09385 17.2816 8.13477C17.1066 12.1761 12.8177 15.0539 7.99168 15.0539C7.58551 15.0539 7.18299 15.033 6.78494 14.9936C8.04168 16.4887 10.2937 17.4853 12.8632 17.4853C13.8004 17.4853 14.6953 17.3525 15.5152 17.1115C16.2488 17.798 17.2924 18.131 18.3516 17.9139C18.636 17.8556 18.9039 17.7613 19.1514 17.6366C19.2311 17.5965 19.2799 17.5133 19.2758 17.4241C19.2717 17.3348 19.2156 17.2564 19.1326 17.2236Z"
                      fill=""
                    />
                    <path
                      d="M15.9831 7.88495C15.9831 4.64604 12.4052 2.02039 7.99157 2.02039C3.57796 2.02039 0 4.64604 0 7.88495C0 9.59177 0.993913 11.1281 2.57987 12.1998C2.16378 12.7826 1.58261 13.2266 0.918435 13.4769C0.835 13.5083 0.777739 13.5857 0.772174 13.6747C0.766609 13.7637 0.813826 13.8477 0.892739 13.8892C1.40926 14.1612 1.98974 14.3031 2.56978 14.3031C3.49617 14.3031 4.36878 13.9422 5.022 13.3309C5.94009 13.6008 6.94213 13.7495 7.99161 13.7495C12.4052 13.7495 15.9831 11.1239 15.9831 7.88495Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_358">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Messages
                </span>
              </button>
              <button
                onClick={navigateProfile}
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Profile
                </span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </ThemeProvider>
  );
};
export default App;
