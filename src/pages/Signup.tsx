import { Checkbox, FormControlLabel, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { updateUserState, resetUserState } from "../states/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);
  const [rePassword, setRePassword] = useState<string>("");

  //response logic
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseSeverity, setResponseSeverity] = useState<
    "success" | "error"
  >();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Handling form inputs change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateUserState({ [name]: value }));
  };

  // Regex for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //verify password
  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  //navigation
  const navigate = useNavigate();

  //submit action
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");

    // Perform email and password validation checks
    let hasErrors = false;

    // Verify email format
    if (!emailRegex.test(state.email)) {
      setResponseMessage("Please enter a valid email address");
      setResponseSeverity("error");
      setOpenSnackbar(true);
      hasErrors = true;
    }

    // Verify passwords match
    if (state.password !== rePassword) {
      setResponseMessage("Passwords do not match");
      setResponseSeverity("error");
      setOpenSnackbar(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      //posting FormData to backend for signup
      const response = await axios({
        method: "POST",
        url: `${backendURL}/signup`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName: state.firstName,
          lastName: state.lastName,
          userName: state.userName,
          email: state.email,
          password: state.password,
        },
      });
      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        setResponseMessage("Signup successful!");
        setResponseSeverity("success");
        setOpenSnackbar(true);
        dispatch(resetUserState());
        setTimeout(() => {
          navigate("/login");
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
      <div className="">
        <img
          src="https://i.ibb.co/Lz0D2nq/signup.png"
          className="h-[1000px] lg:w-[50vw]"
          alt="signup"
        />
      </div>

      {/* sign up form */}
      <form
        onSubmit={handleSignup}
        className="flex flex-col  bg-white shadow-xl rounded-[20px] px-8 pt-6 pb-8"
      >
        <h1 className="font-bold leading-32px text-[24px] mb-7">sign UP</h1>
        <div className="space-y-2 mb-5">
          <label htmlFor="firstName" className="font-semibold leading-6">
            First Name*
          </label>
          <input
            type="text"
            placeholder="Your first name"
            required
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="lastName" className="font-semibold leading-6">
            Last Name*
          </label>
          <input
            type="text"
            required
            placeholder="Your last name"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="userName" className="font-semibold leading-6">
            User name*
          </label>
          <input
            type="text"
            placeholder="Your user name"
            required
            name="userName"
            value={state.userName}
            onChange={handleChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="email" className="font-semibold leading-6">
            Email Address*
          </label>
          <input
            type="text"
            placeholder="Your email address"
            name="email"
            required
            value={state.email}
            onChange={handleChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="password" className="font-semibold leading-6">
            Password*
          </label>
          <input
            type="password"
            placeholder="*********"
            name="password"
            required
            value={state.password}
            onChange={handleChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="password" className="font-semibold leading-6">
            Repeat Password*
          </label>
          <input
            type="password"
            placeholder="*********"
            name="rePassword"
            value={rePassword}
            onChange={handleRePasswordChange}
            required
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Agree to our terms of service"
          />
        </div>

        <div>
          <button
            type="submit"
            className="text-white mt-10 bg-[#4385F5] py-[12px] rounded-[10px] px-[70px]"
          >
            Sign up
          </button>
          <Link
            to={"/login"}
            className="text-[#4385F5] mt-10 bg-white py-[12px] rounded-[10px] px-[48px]"
          >
            Login
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
export default Signup;
