import { Checkbox, FormControlLabel, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const Signup = () => {
  //form inputs
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateBirth] = useState<string>("");
  const [isDatePublic, setIsDatePublic] = useState(false);
  const [password, setPassword] = useState<string>("");
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
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateBirth(e.target.value);
  };

  const handlePublicChange = () => {
    setIsDatePublic(!isDatePublic);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  // Regex for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //navigation
  const navigate = useNavigate();

  //submit action
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");

    // Perform email and password validation checks
    let hasErrors = false;

    // Verify email format
    if (!emailRegex.test(email)) {
      setResponseMessage("Please enter a valid email address");
      setResponseSeverity("error");
      setOpenSnackbar(true);
      hasErrors = true;
    }

    // Verify passwords match
    if (password !== rePassword) {
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
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          password: password,
          dateOfBirth: dateOfBirth,
          isDatePublic: isDatePublic,
        },
      });
      if (response.status === 200) {
        setResponseMessage("Signup successful!");
        setResponseSeverity("success");
        setOpenSnackbar(true);
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
    <div className="flex lg:space-x-12 xl:space-x-28 2xl:space-x-48 justify-center md:justify-start items-center">
      <div className="">
        <img
          src="https://i.ibb.co/Lz0D2nq/signup.png"
          className="h-[1000px] md:w-[50vw] hidden md:block"
          alt="signup"
        />
      </div>

      {/* sign up form */}
      <form
        onSubmit={handleSignup}
        className="flex flex-col  bg-white shadow-xl rounded-[20px] mx-5 px-8 pt-6 pb-8"
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
            value={firstName}
            onChange={handleFirstNameChange}
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
            value={lastName}
            onChange={handleLastNameChange}
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
            value={userName}
            onChange={handleUserNameChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="email" className="font-semibold leading-6">
            Date of Birth*
          </label>
          <input
            type="date"
            placeholder=""
            name="dateOfBirth"
            required
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="mt-[-10px]">
          <FormControlLabel
            checked={isDatePublic}
            onChange={handlePublicChange}
            control={<Checkbox />}
            label="Make public"
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
            value={email}
            onChange={handleEmailChange}
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
            value={password}
            onChange={handlePasswordChange}
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

        <div className="flex items-center">
          <button
            type="submit"
            className="text-white mt-10 bg-[#4385F5] py-[12px] rounded-[10px] px-5 lg:px-[70px]"
          >
            Sign up
          </button>
          <Link
            to={"/login"}
            className="text-[#4385F5] mt-10 bg-white py-[12px] rounded-[10px] px-5 lg:px-[70px]"
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
