import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { updateUserState, resetUserState } from "../states/userSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);

  // Handling form inputs change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateUserState({ [name]: value }));
  };

  //submit action
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", state);
    // posting form inputs to backend for login
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

      <div className="flex lg:space-x-12 xl:space-x-28 2xl:space-x-48 items-center">
        <div>
          <img
            src="https://i.ibb.co/Lz0D2nq/signup.png"
            className="h-[1000px] lg:w-[50vw]"
            alt="signup"
          />
        </div>

        {/* Reset password form */}
        <form className="flex flex-col bg-white shadow-xl rounded-[20px] px-8 pt-6 pb-8">
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
              value={state.email}
              onChange={handleChange}
              className=" appearance-none border-[2px] rounded-[10px] w-full py-[12px] px-[24px] placeholder:text-[#D2D2D1] leading-tight focus:outline-none focus:text-black focus:shadow-outline"
            />
          </div>

          <div className="mt-7">
            <button
              onClick={handleReset}
              className="text-white  bg-[#4385F5] py-[12px] rounded-[10px] px-[70px]"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ResetPassword;
