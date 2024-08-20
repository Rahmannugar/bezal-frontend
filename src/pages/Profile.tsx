import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../states/store";
import { useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import { setUser } from "../states/userSlice";

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

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();
  const [user, setUserProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState(false);

  // Backend URL from environment
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const mode = useSelector((state: RootState) => state.user.mode);
  const loggedInUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Routing native user
  if (userName === loggedInUser?.userName) {
    return <Navigate to={`/${loggedInUser.userName}`} />;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${backendURL}/users/${userName}`);
        setUserProfile(response.data);

        // Check if loggedInUser is already following this profile user
        if (loggedInUser?.userFollows?.includes(response.data._id)) {
          setFollowing(true);
        }
      } catch (err) {
        setError("User not found or an error occurred.");
        console.error(err);
      }
    };

    fetchUserProfile();
  }, [userName, loggedInUser, backendURL]);

  //follow, unfollow function
  const handleFollow = async () => {
    try {
      const response = await axios.put(
        `${backendURL}/users/${userName}/follow`,
        {
          loggedInUserName: loggedInUser?.userName,
        }
      );

      if (response.status === 200) {
        const { following, updatedUserFollows } = response.data;

        setFollowing(following);

        //Updating the loggedInUser in the Redux store
        const updatedLoggedInUser = {
          ...loggedInUser,
          userFollows: updatedUserFollows,
        };
        dispatch(setUser(updatedLoggedInUser));
      }
    } catch (error) {
      console.error("Failed to follow/unfollow the user", error);
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        user && (
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
                          <h1
                            className={`${mode ? "text-black" : "text-white"}`}
                          >
                            @{user.userName}
                          </h1>
                        </div>
                        {/* user bio */}
                        <h1
                          className={`mt-1 ${
                            mode ? "text-black" : "text-white"
                          }`}
                        >
                          {user.bio}
                        </h1>
                      </div>

                      <div>
                        <button
                          onClick={handleFollow}
                          className={`mt-3  text-white py-3 px-4 rounded-md shadow-md duration-100 bg-[#4385F5]`}
                        >
                          {following ? "Following" : "Follow"}
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
                      <h1
                        className={`mt-1 ${mode ? "text-black" : "text-white"}`}
                      >
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

                      <h1
                        className={`mt-1 ${mode ? "text-black" : "text-white"}`}
                      >
                        {user.userPosts.length} posts
                      </h1>
                    </div>
                    {/*follows */}
                    <div className="flex items-center space-x-2">
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

                      <h1
                        className={`mt-1 ${mode ? "text-black" : "text-white"}`}
                      >
                        {user.userFollows.length} follows
                      </h1>
                    </div>
                    {/*followers */}
                    <div className="flex items-center space-x-2">
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

                      <h1
                        className={`mt-1 ${mode ? "text-black" : "text-white"}`}
                      >
                        {user.userFollowers.length} followers
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
