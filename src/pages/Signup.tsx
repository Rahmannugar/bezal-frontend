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

    const lowerCaseEmail = email.toLowerCase();

    // Perform email and password validation checks
    let hasErrors = false;

    // Verify email format
    if (!emailRegex.test(lowerCaseEmail)) {
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
          email: lowerCaseEmail,
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
        <svg
          width="66"
          height="52"
          viewBox="0 0 96 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`group-hover:fill-[#4385F5] fill-[#5D5F63] $`}
        >
          <path
            d="M17.0148 25.4223C18.4356 25.7251 19.5769 26.4355 20.4387 27.5536C21.3005 28.6483 21.7314 29.906 21.7314 31.3269C21.7314 33.3765 21.0094 35.007 19.5653 36.2182C18.1444 37.4061 16.153 38 13.5909 38H2.16615V13.4736H13.2065C15.6988 13.4736 17.6437 14.0442 19.0412 15.1855C20.462 16.3268 21.1724 17.8757 21.1724 19.8323C21.1724 21.2764 20.7881 22.4759 20.0194 23.4309C19.2741 24.3858 18.2725 25.0497 17.0148 25.4223ZM8.14054 23.3959H12.0536C13.0319 23.3959 13.7772 23.1863 14.2896 22.7671C14.8253 22.3245 15.0932 21.684 15.0932 20.8455C15.0932 20.007 14.8253 19.3664 14.2896 18.9239C13.7772 18.4813 13.0319 18.2601 12.0536 18.2601H8.14054V23.3959ZM12.5427 33.1786C13.5443 33.1786 14.3129 32.9573 14.8486 32.5147C15.4076 32.0489 15.6871 31.3851 15.6871 30.5233C15.6871 29.6615 15.396 28.986 14.8137 28.4969C14.2547 28.0077 13.4744 27.7632 12.4728 27.7632H8.14054V33.1786H12.5427ZM43.5739 27.9379C43.5739 28.4969 43.539 29.0792 43.4691 29.6848H29.9481C30.0413 30.8959 30.4256 31.8276 31.1011 32.4798C31.7998 33.1087 32.65 33.4231 33.6515 33.4231C35.1422 33.4231 36.1787 32.7942 36.761 31.5365H43.1197C42.7936 32.8175 42.1997 33.9705 41.3379 34.9953C40.4994 36.0202 39.4396 36.8238 38.1585 37.4061C36.8775 37.9884 35.445 38.2795 33.8612 38.2795C31.9512 38.2795 30.2509 37.8719 28.7602 37.0567C27.2695 36.2415 26.1049 35.0769 25.2664 33.5629C24.4279 32.0489 24.0087 30.2787 24.0087 28.2523C24.0087 26.2259 24.4163 24.4557 25.2315 22.9417C26.07 21.4278 27.2346 20.2632 28.7253 19.4479C30.216 18.6327 31.9279 18.2251 33.8612 18.2251C35.7478 18.2251 37.4248 18.6211 38.8922 19.413C40.3596 20.2049 41.5009 21.3346 42.3161 22.802C43.1546 24.2694 43.5739 25.9813 43.5739 27.9379ZM37.4598 26.3657C37.4598 25.3408 37.1104 24.5256 36.4116 23.92C35.7129 23.3144 34.8394 23.0116 33.7913 23.0116C32.7897 23.0116 31.9396 23.3028 31.2408 23.8851C30.5653 24.4674 30.1461 25.2942 29.983 26.3657H37.4598ZM52.3158 33.0737H60.7707V38H45.6426V33.2484L53.7482 23.4309H45.7125V18.5046H60.5961V23.2562L52.3158 33.0737ZM62.8703 28.2174C62.8703 26.2143 63.243 24.4557 63.9883 22.9417C64.7569 21.4278 65.7934 20.2632 67.0978 19.4479C68.4021 18.6327 69.8579 18.2251 71.465 18.2251C72.8393 18.2251 74.0388 18.5046 75.0636 19.0636C76.1118 19.6226 76.9154 20.3563 77.4744 21.2647V18.5046H83.4487V38H77.4744V35.2399C76.8921 36.1483 76.0768 36.882 75.0287 37.441C74.0039 38 72.8043 38.2795 71.4301 38.2795C69.8462 38.2795 68.4021 37.8719 67.0978 37.0567C65.7934 36.2182 64.7569 35.0419 63.9883 33.5279C63.243 31.9907 62.8703 30.2205 62.8703 28.2174ZM77.4744 28.2523C77.4744 26.7616 77.0551 25.5854 76.2166 24.7236C75.4014 23.8618 74.3998 23.4309 73.2119 23.4309C72.024 23.4309 71.0108 23.8618 70.1723 24.7236C69.3571 25.5621 68.9495 26.7267 68.9495 28.2174C68.9495 29.7081 69.3571 30.8959 70.1723 31.781C71.0108 32.6428 72.024 33.0737 73.2119 33.0737C74.3998 33.0737 75.4014 32.6428 76.2166 31.781C77.0551 30.9192 77.4744 29.743 77.4744 28.2523ZM93.7453 12.1459V38H87.771V12.1459H93.7453Z"
            fill=""
          />
          <circle cx="41.5944" cy="6.26159" r="3.99682" fill="#4385F5" />
          <circle cx="54.5072" cy="6.26159" r="3.99682" fill="#4385F5" />
        </svg>

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
