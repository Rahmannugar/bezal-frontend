import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../states/userSlice";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  // form inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // response logic
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseSeverity, setResponseSeverity] = useState<
    "success" | "error"
  >();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Regex for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handling form inputs change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // navigation
  const navigate = useNavigate();

  // submit action
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");

    // Perform email validation checks
    let hasErrors = false;

    // Verify email format
    if (!emailRegex.test(email)) {
      setResponseMessage("Please enter a valid email address");
      setResponseSeverity("error");
      setOpenSnackbar(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      // posting FormData to backend for login
      const response = await axios({
        method: "POST",
        url: `${backendURL}/signin`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setOpenSnackbar(true);
        setResponseMessage("Login successful!");
        setResponseSeverity("success");
        setTimeout(() => {
          dispatch(setUser(response.data));
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      // Error handling
      const err = error as AxiosError;
      const errorTextContent: any = err.response?.data;
      setResponseMessage(errorTextContent.message);
      setOpenSnackbar(true);
      setResponseSeverity("error");
    }
  };

  return (
    <div className="flex lg:space-x-12 xl:space-x-28 2xl:space-x-48 items-center">
      <div>
        <img
          src="https://i.ibb.co/Lz0D2nq/signup.png"
          className="h-[1000px] lg:w-[50vw]"
          alt="signup"
        />
      </div>

      {/* sign up form */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-white shadow-xl rounded-[20px] px-8 pt-6 pb-8"
      >
        <h1 className="font-bold leading-32px text-[24px] mb-7">Login</h1>

        <div className="space-y-2 mb-5">
          <label htmlFor="email" className="font-semibold leading-6">
            Email Address*
          </label>
          <input
            type="text"
            placeholder="Your email address"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-7">
          <label htmlFor="password" className="font-semibold leading-6">
            Password*
          </label>
          <input
            type="password"
            placeholder="*********"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <Link to={"/forgotPassword"} className="text-[#4385F5]">
          Forgot your password?
        </Link>
        <div className="mt-7">
          <button
            type="submit"
            className="text-white bg-[#4385F5] py-[12px] rounded-[10px] px-[70px]"
          >
            Login
          </button>
          <Link
            to={"/signup"}
            className="text-[#4385F5] bg-white py-[12px] rounded-[10px] px-[48px]"
          >
            Sign up
          </Link>
        </div>

        {/* Alert logic */}
        {responseMessage && (
          <Snackbar open={openSnackbar} autoHideDuration={6000}>
            <Alert
              onClose={handleCloseSnackbar}
              variant="filled"
              severity={responseSeverity}
            >
              {responseMessage}
            </Alert>
          </Snackbar>
        )}
      </form>
    </div>
  );
};

export default Login;
