import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { resetUser, setMode } from "../states/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Popover, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Switch from "./Switch";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const mode = useSelector((state: RootState) => state.user.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //handle user menu popup
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //handle search user menu popup
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleSearchPopoverOpen = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchPopoverClose = () => {
    setSearchAnchorEl(null);
  };

  // backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  //log user out function
  const handleResetUser = () => {
    setOpenSnackbar(true);
    dispatch(resetUser());
    setTimeout(() => {
      // dispatch(resetUser());
      navigate("/login");
    }, 2000);
  };

  const open = Boolean(anchorEl);

  const searchOpen = Boolean(searchAnchorEl);

  const handleMode = () => {
    dispatch(setMode());
  };

  //search for users
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleFindUsers();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleFindUsers = async () => {
    try {
      const response = await axios.get(`${backendURL}/users/search`, {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <nav>
      <div className="flex relative py-5 justify-between space-x-3 w-full items-center px-5 md:px-16">
        {/* App icon */}
        <a href="/">
          <svg
            width="66"
            height="52"
            viewBox="0 0 96 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`group-hover:fill-[#4385F5] ${
              mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
            }`}
          >
            <path
              d="M17.0148 25.4223C18.4356 25.7251 19.5769 26.4355 20.4387 27.5536C21.3005 28.6483 21.7314 29.906 21.7314 31.3269C21.7314 33.3765 21.0094 35.007 19.5653 36.2182C18.1444 37.4061 16.153 38 13.5909 38H2.16615V13.4736H13.2065C15.6988 13.4736 17.6437 14.0442 19.0412 15.1855C20.462 16.3268 21.1724 17.8757 21.1724 19.8323C21.1724 21.2764 20.7881 22.4759 20.0194 23.4309C19.2741 24.3858 18.2725 25.0497 17.0148 25.4223ZM8.14054 23.3959H12.0536C13.0319 23.3959 13.7772 23.1863 14.2896 22.7671C14.8253 22.3245 15.0932 21.684 15.0932 20.8455C15.0932 20.007 14.8253 19.3664 14.2896 18.9239C13.7772 18.4813 13.0319 18.2601 12.0536 18.2601H8.14054V23.3959ZM12.5427 33.1786C13.5443 33.1786 14.3129 32.9573 14.8486 32.5147C15.4076 32.0489 15.6871 31.3851 15.6871 30.5233C15.6871 29.6615 15.396 28.986 14.8137 28.4969C14.2547 28.0077 13.4744 27.7632 12.4728 27.7632H8.14054V33.1786H12.5427ZM43.5739 27.9379C43.5739 28.4969 43.539 29.0792 43.4691 29.6848H29.9481C30.0413 30.8959 30.4256 31.8276 31.1011 32.4798C31.7998 33.1087 32.65 33.4231 33.6515 33.4231C35.1422 33.4231 36.1787 32.7942 36.761 31.5365H43.1197C42.7936 32.8175 42.1997 33.9705 41.3379 34.9953C40.4994 36.0202 39.4396 36.8238 38.1585 37.4061C36.8775 37.9884 35.445 38.2795 33.8612 38.2795C31.9512 38.2795 30.2509 37.8719 28.7602 37.0567C27.2695 36.2415 26.1049 35.0769 25.2664 33.5629C24.4279 32.0489 24.0087 30.2787 24.0087 28.2523C24.0087 26.2259 24.4163 24.4557 25.2315 22.9417C26.07 21.4278 27.2346 20.2632 28.7253 19.4479C30.216 18.6327 31.9279 18.2251 33.8612 18.2251C35.7478 18.2251 37.4248 18.6211 38.8922 19.413C40.3596 20.2049 41.5009 21.3346 42.3161 22.802C43.1546 24.2694 43.5739 25.9813 43.5739 27.9379ZM37.4598 26.3657C37.4598 25.3408 37.1104 24.5256 36.4116 23.92C35.7129 23.3144 34.8394 23.0116 33.7913 23.0116C32.7897 23.0116 31.9396 23.3028 31.2408 23.8851C30.5653 24.4674 30.1461 25.2942 29.983 26.3657H37.4598ZM52.3158 33.0737H60.7707V38H45.6426V33.2484L53.7482 23.4309H45.7125V18.5046H60.5961V23.2562L52.3158 33.0737ZM62.8703 28.2174C62.8703 26.2143 63.243 24.4557 63.9883 22.9417C64.7569 21.4278 65.7934 20.2632 67.0978 19.4479C68.4021 18.6327 69.8579 18.2251 71.465 18.2251C72.8393 18.2251 74.0388 18.5046 75.0636 19.0636C76.1118 19.6226 76.9154 20.3563 77.4744 21.2647V18.5046H83.4487V38H77.4744V35.2399C76.8921 36.1483 76.0768 36.882 75.0287 37.441C74.0039 38 72.8043 38.2795 71.4301 38.2795C69.8462 38.2795 68.4021 37.8719 67.0978 37.0567C65.7934 36.2182 64.7569 35.0419 63.9883 33.5279C63.243 31.9907 62.8703 30.2205 62.8703 28.2174ZM77.4744 28.2523C77.4744 26.7616 77.0551 25.5854 76.2166 24.7236C75.4014 23.8618 74.3998 23.4309 73.2119 23.4309C72.024 23.4309 71.0108 23.8618 70.1723 24.7236C69.3571 25.5621 68.9495 26.7267 68.9495 28.2174C68.9495 29.7081 69.3571 30.8959 70.1723 31.781C71.0108 32.6428 72.024 33.0737 73.2119 33.0737C74.3998 33.0737 75.4014 32.6428 76.2166 31.781C77.0551 30.9192 77.4744 29.743 77.4744 28.2523ZM93.7453 12.1459V38H87.771V12.1459H93.7453Z"
              fill=""
            />
            <circle cx="41.5944" cy="6.26159" r="3.99682" fill="#4385F5" />
            <circle cx="54.5072" cy="6.26159" r="3.99682" fill="#4385F5" />
          </svg>
        </a>

        {/* search field */}
        <div className="hidden md:flex justify-start items-center space-x-1 w-[649px] h-[40px] px-5 py-3 border-[2px] border-gray-300 rounded-[10px] bg-white">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearchPopoverOpen(e);
            }}
            className="w-full outline-none border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* search user popup menu */}
        <Popover
          open={searchOpen}
          anchorEl={searchAnchorEl}
          onClose={handleSearchPopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableAutoFocus
          disableEnforceFocus
        >
          <div className="h-[30vh]">
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <button className="hover:bg-gray-300">
                  <div
                    key={user._id}
                    className="flex items-center space-x-3 py-3 w-[400px] px-5"
                    onClick={() => navigate(`/users/${user.userName}`)}
                  >
                    <img
                      src={user.profileImage}
                      alt={`${user.userName}'s profile`}
                      className="w-[40px] h-[40px] object-cover rounded-full"
                    />
                    <div>
                      <span>{user.userName}</span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-3 w-[400px] px-5">No users found</div>
            )}
          </div>
        </Popover>

        {/* notification icon */}
        <a href="/notifications">
          <button className="hidden md:flex justify-center">
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
              <div className="bg-[#4385F5] rounded-full w-2 h-2"></div>
            )}
          </button>
        </a>

        {/* switch button */}
        <button onClick={handleMode}>
          <Switch />
        </button>

        {/* user(s) menu */}
        <div className="flex justify-center items-center space-x-3">
          <img
            src={user.profileImage}
            alt="bezal"
            className="w-[40px] h-[40px] rounded-full"
          />

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#ffffff",
              },
            }}
          >
            <div className={` px-7 py-7 rounded-xl space-y-5 flex flex-col`}>
              <Link to={`/${user.userName}`}>
                <button className="text-white bg-[#4385F5] hover:bg-[#AAAAAA] duration-200 h-[40px] w-[90px] rounded-[10px]">
                  Profile
                </button>
              </Link>

              <button
                onClick={handleResetUser}
                className="text-white bg-[#4385F5] hover:bg-[#AAAAAA] duration-200 h-[40px] w-[90px] rounded-[10px]"
              >
                Log out
              </button>
            </div>
          </Popover>
          <button
            onClick={handlePopoverOpen}
            className={`flex justify-center items-center space-x-2 rounded-[10px] ${
              mode
                ? "border-none bg-[#f7f6f6] text-[#585858]"
                : "bg-transparent text-white border"
            } md:w-[160px] w-[100px] h-[40px] md:h-[47px]`}
          >
            <h1>{user.userName}</h1>

            <div>
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill=""
                className={`group-hover:fill-[#4385F5] ${
                  mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L7.28571 6L13 1" stroke="#585858" />
              </svg>
            </div>
          </button>
        </div>

        {/* Alert logic */}
        {isLoggedIn ? (
          <></>
        ) : (
          <Snackbar open={openSnackbar} autoHideDuration={3000}>
            <Alert
              onClose={handleCloseSnackbar}
              variant="filled"
              severity="info"
            >
              User has logged out!
            </Alert>
          </Snackbar>
        )}
      </div>

      {/* search field */}
      <div className="flex md:hidden justify-start items-center space-x-1 w-[90vw] mx-auto h-[40px] px-5 py-3 border-[2px] border-gray-300 rounded-[10px] bg-white">
        <svg
          className="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearchPopoverOpen(e);
          }}
          className="w-full outline-none border-none bg-transparent focus:ring-0"
        />
      </div>
    </nav>
  );
};

export default Navbar;
