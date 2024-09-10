import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Alert, Snackbar } from "@mui/material";

const ResetPassword = () => {
  //form inputs
  const [email, setEmail] = useState<string>("");

  // Handling form inputs change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

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
  const navigate = useNavigate();

  //submit action
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // posting FormData to backend for login
      const response = await axios({
        method: "POST",
        url: `${backendURL}/forgotPassword`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setEmail("");
        setOpenSnackbar(true);
        setResponseMessage("You have been sent a password reset mail!");
        setResponseSeverity("success");
        setTimeout(() => {
          navigate("/verifypassword");
        }, 1500);
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
    <>
      <div className="relative">
        <div className="absolute top-8 right-16">
          <Link
            to={"/login"}
            className="bg-[#4385F5] text-white rounded-[10px] py-3 px-16 font-semibold"
          >
            Join
          </Link>
        </div>
      </div>

      <div className="flex lg:space-x-12 xl:space-x-28 2xl:space-x-48 justify-center md:justify-start items-center">
        <div>
          <img
            src="https://i.ibb.co/Lz0D2nq/signup.png"
            className="h-[1000px] md:w-[50vw] hidden md:block"
            alt="signup"
          />
        </div>

        {/* Reset password form */}
        <form
          onSubmit={handleReset}
          className="flex flex-col bg-white shadow-xl mt-[250px] md:mt-0 rounded-[20px] mx-5 px-8 pt-6 pb-8"
        >
          <h1 className="font-bold leading-32px text-[24px] mb-7">
            Reset your password
          </h1>

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
              className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="text-white  bg-[#4385F5] py-[12px] rounded-[10px] px-[70px]"
            >
              Continue
            </button>
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
    </>
  );
};
export default ResetPassword;
