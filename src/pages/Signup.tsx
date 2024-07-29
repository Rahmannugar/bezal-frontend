import { Checkbox, FormControlLabel } from "@mui/material";
import { userData } from "../states/UserContext";

const Signup = () => {
  const { state, setState } = userData();
  return (
    <div className="flex space-x-20 items-center">
      <div>
        <img src="https://i.ibb.co/Lz0D2nq/signup.png" alt="signup"></img>
      </div>

      {/* sign up form */}
      <form className="flex flex-col bg-white shadow-md rounded-[20px] px-8 pt-6 pb-8">
        <h1 className="font-bold leading-32px text-[24px] mb-7">sign UP</h1>
        <div className="space-y-2 mb-5">
          <label htmlFor="firstName" className="font-semibold leading-6">
            First Name*
          </label>
          <input
            type="text"
            placeholder="Your first name"
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="lastName" className="font-semibold leading-6">
            Last Name*
          </label>
          <input
            type="text"
            placeholder="Your last name"
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="userName" className="font-semibold leading-6">
            User name*
          </label>
          <input
            type="text"
            placeholder="Your user name"
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="email" className="font-semibold leading-6">
            Email Address*
          </label>
          <input
            type="text"
            placeholder="Your email address"
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="password" className="font-semibold leading-6">
            Password*
          </label>
          <input
            type="password"
            placeholder="*********"
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="password" className="font-semibold leading-6">
            Password*
          </label>
          <input
            type="password"
            placeholder="*********"
            className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
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
          <button className="text-white mt-10 bg-[#4385F5] py-[12px] rounded-[10px] px-[70px]">
            Sign up
          </button>
          <button className="text-[#4385F5] mt-10 bg-white py-[12px] rounded-[10px] px-[48px]">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
