import { useSelector } from "react-redux";
import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";
import { RootState } from "../states/store";
import { Popover, useTheme } from "@mui/material";
import EditProfile from "../components/EditProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const mode = useSelector((state: RootState) => state.user.mode);
  const navigate = useNavigate();
  const theme = useTheme();

  // Backend URL from environment
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  //get user followers
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    bio: string;
    profileImage: string;
    coverImage: string;
    dateOfBirth: string;
    isDatePublic: boolean;
    location: string;
    userPosts: string[];
    userFollowers: string[];
    userFollows: string[];
  }

  const [followResults, setFollowResults] = useState<User[]>([]);
  const [followerResults, setFollowerResults] = useState<User[]>([]);

  useEffect(() => {
    const getUserFollowing = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/users/following/${user.userName}`
        );
        if (response.status === 200) {
          setFollowResults(response.data.follows);
          setFollowerResults(response.data.followers);
        }
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };

    getUserFollowing();
  }, [user.userName, backendURL]);

  //view follows and followers
  const [followAnchorEl, setFollowAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [followerAnchorEl, setFollowerAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleFollowPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFollowAnchorEl(event.currentTarget);
  };

  const handleFollowPopoverClose = () => {
    setFollowAnchorEl(null);
  };

  const handleFollowerPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFollowerAnchorEl(event.currentTarget);
  };

  const handleFollowerPopoverClose = () => {
    setFollowerAnchorEl(null);
  };
  const followOpen = Boolean(followAnchorEl);
  const followerOpen = Boolean(followerAnchorEl);

  //editing user data
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div
      style={{
        background: mode
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="flex space-x-5">
        <LeftBar />
        <div className="w-full px-10">
          {/* cover image */}
          <div className="relative">
            <img
              src={user.coverImage}
              alt="user-cover-image"
              className="min-w-[700px] w-full max-w-[100%] h-[343px] mt-5 object-cover rounded-b-[20px]"
            />
            <button onClick={handleEditProfileClick}>
              <svg
                className="absolute top-7 left-5"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="" fill-opacity="0.5" />
                <path
                  d="M23.7379 20.125C23.7379 20.9538 23.4048 21.7487 22.812 22.3347C22.2192 22.9208 21.4152 23.25 20.5768 23.25C19.7385 23.25 18.9344 22.9208 18.3416 22.3347C17.7488 21.7487 17.4158 20.9538 17.4158 20.125C17.4158 19.2962 17.7488 18.5013 18.3416 17.9153C18.9344 17.3292 19.7385 17 20.5768 17C21.4152 17 22.2192 17.3292 22.812 17.9153C23.4048 18.5013 23.7379 19.2962 23.7379 20.125Z"
                  fill="#FAFAFA"
                />
                <path
                  d="M12.9903 14.5C12.3196 14.5 11.6764 14.7634 11.2021 15.2322C10.7279 15.7011 10.4614 16.337 10.4614 17V24.5C10.4614 25.163 10.7279 25.7989 11.2021 26.2678C11.6764 26.7366 12.3196 27 12.9903 27H28.1633C28.834 27 29.4773 26.7366 29.9515 26.2678C30.4258 25.7989 30.6922 25.163 30.6922 24.5V17C30.6922 16.337 30.4258 15.7011 29.9515 15.2322C29.4773 14.7634 28.834 14.5 28.1633 14.5H26.6814C26.0108 14.4999 25.3677 14.2364 24.8935 13.7675L23.8466 12.7325C23.3725 12.2636 22.7293 12.0001 22.0587 12H19.0949C18.4243 12.0001 17.7812 12.2636 17.307 12.7325L16.2601 13.7675C15.7859 14.2364 15.1428 14.4999 14.4722 14.5H12.9903ZM13.6225 17C13.4548 17 13.294 16.9342 13.1754 16.8169C13.0569 16.6997 12.9903 16.5408 12.9903 16.375C12.9903 16.2092 13.0569 16.0503 13.1754 15.9331C13.294 15.8158 13.4548 15.75 13.6225 15.75C13.7902 15.75 13.951 15.8158 14.0695 15.9331C14.1881 16.0503 14.2547 16.2092 14.2547 16.375C14.2547 16.5408 14.1881 16.6997 14.0695 16.8169C13.951 16.9342 13.7902 17 13.6225 17ZM25.0023 20.125C25.0023 21.2853 24.536 22.3981 23.7061 23.2186C22.8762 24.0391 21.7505 24.5 20.5768 24.5C19.4031 24.5 18.2775 24.0391 17.4475 23.2186C16.6176 22.3981 16.1513 21.2853 16.1513 20.125C16.1513 18.9647 16.6176 17.8519 17.4475 17.0314C18.2775 16.2109 19.4031 15.75 20.5768 15.75C21.7505 15.75 22.8762 16.2109 23.7061 17.0314C24.536 17.8519 25.0023 18.9647 25.0023 20.125Z"
                  fill="#FAFAFA"
                />
              </svg>
            </button>

            {/* profile image  */}
            <div className="flex space-x-4">
              <img
                className={` ml-[20px] transform object-cover -translate-y-1/2 rounded-full w-[250px]  h-[250px] border-[8px] ${
                  mode ? "border-[#FAFAFA]" : "border-black"
                }`}
                src={user.profileImage}
                alt="user-profile-image"
              />

              <div className="mt-7 flex justify-between w-full">
                {/* user names */}
                <div>
                  <div className="flex space-x-7 items-center">
                    <h1
                      className={`font-semibold text-[20px] ${
                        mode ? "text-black" : "text-white"
                      }`}
                    >
                      {user.firstName} {user.lastName}
                    </h1>
                    <h1 className={`${mode ? "text-black" : "text-white"}`}>
                      @{user.userName}
                    </h1>
                  </div>
                  {/* user bio */}
                  <h1 className={`mt-1 ${mode ? "text-black" : "text-white"}`}>
                    {user.bio}
                  </h1>
                </div>

                <div>
                  <button
                    onClick={handleEditProfileClick}
                    className={`mt-3 hover:text-[#4385F5] duration-100 ${
                      mode ? "text-black" : "text-white"
                    }`}
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>

            {user.isDatePublic ? (
              <h1
                className={`mt-[-100px] mb-5 ${
                  mode ? "text-black" : "text-white"
                } text-center`}
              >
                Date of Birth: {user.dateOfBirth}
              </h1>
            ) : (
              ""
            )}

            {/* other info */}
            <div className="flex items-center space-x-16 justify-center">
              {/* location */}
              <div className="flex items-center space-x-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1.25C8.1773 1.25215 6.42987 1.97717 5.14102 3.26602C3.85218 4.55486 3.12716 6.3023 3.12501 8.125C3.12282 9.61452 3.60937 11.0636 4.51001 12.25C4.51001 12.25 4.69751 12.4969 4.72813 12.5325L10 18.75L15.2744 12.5294C15.3019 12.4963 15.49 12.25 15.49 12.25L15.4906 12.2481C16.3908 11.0623 16.8771 9.61383 16.875 8.125C16.8729 6.3023 16.1478 4.55486 14.859 3.26602C13.5701 1.97717 11.8227 1.25215 10 1.25ZM10 10.625C9.50555 10.625 9.0222 10.4784 8.61108 10.2037C8.19996 9.92897 7.87953 9.53852 7.69031 9.08171C7.50109 8.62489 7.45158 8.12223 7.54804 7.63727C7.64451 7.15232 7.88261 6.70686 8.23224 6.35723C8.58187 6.0076 9.02733 5.7695 9.51228 5.67304C9.99723 5.57657 10.4999 5.62608 10.9567 5.8153C11.4135 6.00452 11.804 6.32495 12.0787 6.73607C12.3534 7.1472 12.5 7.63055 12.5 8.125C12.4992 8.78779 12.2355 9.42319 11.7669 9.89185C11.2982 10.3605 10.6628 10.6242 10 10.625Z"
                    fill={mode ? "#AAAAAA" : "#fff"}
                  />
                </svg>
                <h1 className={`mt-1 ${mode ? "text-black" : "text-white"}`}>
                  {user.location}
                </h1>
              </div>

              {/* posts */}
              <div className="flex items-center space-x-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8333 4.16667V15.8333H4.16667V4.16667H15.8333ZM17.5 2.5H2.5V17.5H17.5V2.5ZM14.1667 14.1667H5.83333V13.3333H14.1667V14.1667ZM14.1667 12.5H5.83333V11.6667H14.1667V12.5ZM14.1667 10H5.83333V5.83333H14.1667V10Z"
                    fill={mode ? "#AAAAAA" : "#fff"}
                  />
                </svg>

                <h1 className={`mt-1 ${mode ? "text-black" : "text-white"}`}>
                  {user.userPosts.length === 1
                    ? `${user.userPosts.length} post`
                    : `${user.userPosts.length} posts`}
                </h1>
              </div>

              {/*follows */}
              <button className="flex items-center space-x-2">
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8C7.93437 8 9.5 6.43437 9.5 4.5C9.5 2.56562 7.93437 1 6 1C4.06563 1 2.5 2.56562 2.5 4.5C2.5 6.43437 4.06563 8 6 8ZM8.4 9H8.14062C7.49062 9.3125 6.76875 9.5 6 9.5C5.23125 9.5 4.5125 9.3125 3.85938 9H3.6C1.6125 9 0 10.6125 0 12.6V13.5C0 14.3281 0.671875 15 1.5 15H10.5C11.3281 15 12 14.3281 12 13.5V12.6C12 10.6125 10.3875 9 8.4 9ZM15 8C16.6562 8 18 6.65625 18 5C18 3.34375 16.6562 2 15 2C13.3438 2 12 3.34375 12 5C12 6.65625 13.3438 8 15 8ZM16.5 9H16.3813C15.9469 9.15 15.4875 9.25 15 9.25C14.5125 9.25 14.0531 9.15 13.6187 9H13.5C12.8625 9 12.275 9.18437 11.7594 9.48125C12.5219 10.3031 13 11.3938 13 12.6V13.8C13 13.8688 12.9844 13.9344 12.9812 14H18.5C19.3281 14 20 13.3281 20 12.5C20 10.5656 18.4344 9 16.5 9Z"
                    fill={mode ? "#AAAAAA" : "#fff"}
                  />
                </svg>

                <div
                  onClick={handleFollowPopoverOpen}
                  className={`mt-1 ${mode ? "text-black" : "text-white"}`}
                >
                  {user.userFollows.length === 1
                    ? `${user.userFollows.length} follow`
                    : `${user.userFollows.length} follows`}
                </div>
              </button>

              {/* follows */}
              <Popover
                open={followOpen}
                anchorEl={followAnchorEl}
                onClose={handleFollowPopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                disableAutoFocus
                disableEnforceFocus
              >
                <div className="h-[30vh]">
                  {followResults.length > 0 ? (
                    followResults.map((follow) => (
                      <button className="hover:bg-gray-300">
                        <div
                          key={follow._id}
                          className="flex items-center space-x-3 py-3 w-[400px] px-5"
                          onClick={() => navigate(`/users/${follow.userName}`)}
                        >
                          <img
                            src={follow.profileImage}
                            alt={`${follow.userName}'s profile`}
                            className="w-[30px] h-[30px] object-cover rounded-full"
                          />
                          <div>
                            <span>{follow.userName}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-3 w-[400px] text-black px-5">
                      You currently follow no one!
                    </div>
                  )}
                </div>
              </Popover>

              {/*followers */}
              <button className="flex items-center space-x-2">
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8C7.93437 8 9.5 6.43437 9.5 4.5C9.5 2.56562 7.93437 1 6 1C4.06563 1 2.5 2.56562 2.5 4.5C2.5 6.43437 4.06563 8 6 8ZM8.4 9H8.14062C7.49062 9.3125 6.76875 9.5 6 9.5C5.23125 9.5 4.5125 9.3125 3.85938 9H3.6C1.6125 9 0 10.6125 0 12.6V13.5C0 14.3281 0.671875 15 1.5 15H10.5C11.3281 15 12 14.3281 12 13.5V12.6C12 10.6125 10.3875 9 8.4 9ZM15 8C16.6562 8 18 6.65625 18 5C18 3.34375 16.6562 2 15 2C13.3438 2 12 3.34375 12 5C12 6.65625 13.3438 8 15 8ZM16.5 9H16.3813C15.9469 9.15 15.4875 9.25 15 9.25C14.5125 9.25 14.0531 9.15 13.6187 9H13.5C12.8625 9 12.275 9.18437 11.7594 9.48125C12.5219 10.3031 13 11.3938 13 12.6V13.8C13 13.8688 12.9844 13.9344 12.9812 14H18.5C19.3281 14 20 13.3281 20 12.5C20 10.5656 18.4344 9 16.5 9Z"
                    fill={mode ? "#AAAAAA" : "#fff"}
                  />
                </svg>

                <div
                  onClick={handleFollowerPopoverOpen}
                  className={`mt-1 ${mode ? "text-black" : "text-white"}`}
                >
                  {user.userFollowers.length === 1
                    ? `${user.userFollowers.length} follower`
                    : `${user.userFollowers.length} followers`}
                </div>
              </button>

              {/* followers */}
              <Popover
                open={followerOpen}
                anchorEl={followerAnchorEl}
                onClose={handleFollowerPopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                disableAutoFocus
                disableEnforceFocus
              >
                <div className="h-[30vh]">
                  {followerResults.length > 0 ? (
                    followerResults.map((follower) => (
                      <button className="hover:bg-gray-300">
                        <div
                          key={follower._id}
                          className="flex items-center space-x-3 py-3 w-[400px] px-5"
                          onClick={() =>
                            navigate(`/users/${follower.userName}`)
                          }
                        >
                          <img
                            src={follower.profileImage}
                            alt={`${follower.userName}'s profile`}
                            className="w-[40px] h-[40px] object-cover rounded-full"
                          />
                          <div>
                            <span>{follower.userName}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-3 text-black w-[400px] px-5">
                      You currently have no followers!
                    </div>
                  )}
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <EditProfile
            user={user}
            isDialogOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
