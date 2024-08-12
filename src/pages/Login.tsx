import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { updateUserState, resetUserState } from "../states/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);

  // Handling form inputs change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateUserState({ [name]: value }));
  };

  //submit action
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", state);
    // posting form inputs to backend for login
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
      <form className="flex flex-col bg-white shadow-xl rounded-[20px] px-8 pt-6 pb-8">
        <h1 className="font-bold leading-32px text-[24px] mb-7">Login</h1>

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

        <div className="space-y-2 mb-7">
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

        <Link to={"/forgotPassword"} className="text-[#4385F5]">
          Forgot your password?
        </Link>
        <div className="mt-7">
          <button
            onClick={handleLogin}
            className="text-white  bg-[#4385F5] py-[12px] rounded-[10px] px-[70px]"
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
      </form>
    </div>
  );
};
export default Login;
