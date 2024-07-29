import { Checkbox, FormControlLabel } from "@mui/material";
import { userData } from "../states/UserContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const { state, setState } = userData();

  //handling form inputs change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //submit action
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", state);
    // posting form inputs to backend for signup
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
      <form className="flex flex-col  bg-white shadow-xl rounded-[20px] px-8 pt-6 pb-8">
        <h1 className="font-bold leading-32px text-[24px] mb-7">sign UP</h1>
        <div className="space-y-2 mb-5">
          <label htmlFor="firstName" className="font-semibold leading-6">
            First Name*
          </label>
          <input
            type="text"
            placeholder="Your first name"
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
            // name="password"
            // value={state.password}
            // onChange={handleChange}
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
            onClick={handleSignup}
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
      </form>
    </div>
  );
};
export default Signup;
