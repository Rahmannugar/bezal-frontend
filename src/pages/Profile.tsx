import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../states/store";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Popover,
  Snackbar,
  useTheme,
} from "@mui/material";
import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import { setCurrentConversation, setUser } from "../states/userSlice";
import SendIcon from "@mui/icons-material/Send";

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

interface Post {
  _id: string;
  userId: string;
  userName: string;
  postMessage: string;
  picturePath: string[];
  userPicturePath?: string;
  views: number;
  isPublic: boolean;
  likes: Record<string, boolean>;
  dislikes: Record<string, boolean>;
  comments: string[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();
  const [user, setUserProfile] = useState<User | null>(null);
  const [followResults, setFollowResults] = useState<User[]>([]);
  const [followerResults, setFollowerResults] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");

  // Backend URL from environment
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const mode = useSelector((state: RootState) => state.user.mode);
  const mainUser = useSelector((state: RootState) => state.user.user);
  const loggedInUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // Routing native user
  if (userName === loggedInUser?.userName) {
    return <Navigate to={`/${loggedInUser.userName}`} />;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${backendURL}/users/${userName}`);
        if (response.status === 200) {
          setUserProfile(response.data);
        }

        // Check if loggedInUser is already following this profile user
        if (loggedInUser?.userFollows?.includes(response.data._id)) {
          setFollowing(true);
        }
      } catch (err) {
        setError("User not found or an error occurred.");
        console.error(err);
      }
    };

    const getUserFollowing = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/users/following/${userName}`
        );
        if (response.status === 200) {
          setFollowResults(response.data.follows);
          setFollowerResults(response.data.followers);
        }
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/posts//userposts/${userName}`
        );
        const fetchedPosts = response.data;
        const filteredPosts = fetchedPosts.filter(
          (post: Post) =>
            post.isPublic || mainUser.userFollows.includes(post.userId)
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUserPosts();

    fetchUserProfile();
    getUserFollowing();
  }, [userName, loggedInUser, backendURL]);

  //follow, unfollow function
  const handleFollow = async () => {
    try {
      const response = await axios.put(
        `${backendURL}/users/${userName}/follow`,
        {},
        {
          withCredentials: true,
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
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.message);
        console.error("Error details:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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

  //post section
  const [posts, setPosts] = useState<Post[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const formatTimeAgo = (timestamp: string) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 7) {
      // Return the exact date if more than 7 days have passed
      return postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else if (diffInDays > 0) {
      // Show days ago if more than 1 day but less than 7 days
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    } else if (diffInHrs > 0) {
      // Show hours ago if more than 1 hour but less than 24 hours
      return diffInHrs === 1 ? "1 hour ago" : `${diffInHrs} hours ago`;
    } else if (diffInMins > 0) {
      // Show minutes ago if more than 1 minute but less than 1 hour
      return diffInMins === 1 ? "1 minute ago" : `${diffInMins} minutes ago`;
    } else {
      return "Just now";
    }
  };

  const createConversation = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/conversations`,
        {
          sender: loggedInUser._id,
          receiver: user?._id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const newConversation = response.data;
        dispatch(setCurrentConversation(newConversation));
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("User not found or an error occurred.");
    }
  };

  const likePost = async (postId: string) => {
    try {
      const response = await axios.patch(
        `${backendURL}/posts/${postId}/like`,
        {},
        {
          withCredentials: true,
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : post
        )
      );

      const updatedLikes = { ...mainUser.likes };
      const updatedDislikes = { ...mainUser.dislikes };

      if (updatedLikes[postId]) {
        delete updatedLikes[postId];
      } else {
        updatedLikes[postId] = true;

        if (updatedDislikes[postId]) {
          delete updatedDislikes[postId];
        }
      }
      dispatch(
        setUser({
          ...mainUser,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        })
      );
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const dislikePost = async (postId: string) => {
    try {
      const response = await axios.patch(
        `${backendURL}/posts/${postId}/dislike`,
        {},
        {
          withCredentials: true,
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : post
        )
      );

      const updatedLikes = { ...mainUser.likes };
      const updatedDislikes = { ...mainUser.dislikes };

      if (updatedDislikes[postId]) {
        delete updatedDislikes[postId];
      } else {
        updatedDislikes[postId] = true;
        if (updatedLikes[postId]) {
          delete updatedLikes[postId];
        }
      }

      dispatch(
        setUser({
          ...mainUser,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        })
      );
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const sharePost = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => {
        setResponseMessage("Post link has been copied to your clipboard!");
        setResponseSeverity("info");
        setOpenSnackbar(true);
      },
      (err) => {
        console.error("Failed to copy link to clipboard", err);
        setResponseMessage("Failed to copy link. Please try again.");
        setResponseSeverity("error");
        setOpenSnackbar(true);
      }
    );
  };

  //alert options
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseSeverity, setResponseSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //tip menu
  const handleTipClick = (postUserId: string) => {
    if (postUserId == mainUser._id) {
      setResponseMessage("Post creator isn't allowed to do this!");
      setResponseSeverity("warning");
      setOpenSnackbar(true);
    } else {
      setResponseMessage("This feature is coming soon");
      setResponseSeverity("info");
      setOpenSnackbar(true);
    }
  };

  //open delete dialog
  const handleDialogOpen = (postUserId: string) => {
    if (postUserId == mainUser._id) {
      setOpenDialog(true);
    } else {
      setResponseMessage("Only post creator is allowed to do this!");
      setResponseSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  //deletePost
  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(
        `${backendURL}/posts/${postId}/deletepost`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        setResponseMessage("You've successfully deleted this post");
        setResponseSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
          );
        }, 1500);
      }
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  //comment post
  const handleCommentMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const message = e.target.value;
    setCommentMessage(message);
  };

  //submit comment
  const submitComment = async (postId: string) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${backendURL}/posts/${postId}/commentpost`,
        data: {
          commentMessage: commentMessage,
        },
        withCredentials: true,
      });
      if (response.status == 200) {
        setResponseMessage("You've successfully commented on this post");
        setResponseSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate(`/posts/${postId}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error commenting post", error);
      setResponseMessage("Error commenting post");
      setResponseSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      {error ? (
        <p
          className={`flex justify-center items-center h-screen ${
            mode ? "text-black" : "text-white"
          }`}
        >
          {error}
        </p>
      ) : (
        user && (
          <div
            className="overflow-hidden"
            style={{
              background: mode
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <div className="flex md:space-x-5">
              <LeftBar />
              <div className="w-full px-10">
                {/* cover image */}
                <div className="relative">
                  <img
                    src={user.coverImage}
                    alt="user-cover-image"
                    className="lg:min-w-[700px] w-full max-w-[100%] h-[250px] lg:h-[343px] mt-5 object-cover rounded-b-[20px]"
                  />

                  {/* profile image  */}
                  <div className="flex space-x-4">
                    <img
                      className={`  ml-[20px] transform object-cover -translate-y-1/2 mt-[-20px] md:mt-0 rounded-full w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] border-[8px] ${
                        mode ? "border-[#FAFAFA]" : "border-black"
                      }`}
                      src={user.profileImage}
                      alt="user-profile-image"
                    />

                    <div className="mt-7 hidden lg:flex justify-between w-full">
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

                      <div className="space-x-4">
                        <button onClick={createConversation}>
                          {/* <a href={`/chat/${user._id}`}> */}
                          <ChatIcon
                            sx={{
                              color: mode ? "black" : "white",
                              fontSize: 36,
                            }}
                          />
                          {/* </a> */}
                        </button>
                        <button
                          onClick={handleFollow}
                          className={`mt-3  text-white py-3 px-4 rounded-md shadow-md duration-100 bg-[#4385F5]`}
                        >
                          {following ? "Following" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* user names */}
                  <div className="">
                    <div className="lg:hidden flex space-x-3 mt-[-70px] items-center">
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
                    <h1
                      className={`mt-1 ${
                        mode ? "text-black" : "text-white"
                      } lg:hidden`}
                    >
                      {user.bio}
                    </h1>

                    <div className="space-x-4 mt-[10px] lg:hidden">
                      <button>
                        <a href={`/chat/${user._id}`}>
                          <ChatIcon
                            sx={{
                              color: mode ? "black" : "white",
                              fontSize: 36,
                            }}
                          />
                        </a>
                      </button>
                      <button
                        onClick={handleFollow}
                        className={`mt-3  text-white py-3 px-4 rounded-md shadow-md duration-100 bg-[#4385F5]`}
                      >
                        {following ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                  {user.isDatePublic ? (
                    <h1
                      className={`lg:mt-[-100px] mt-[30px] mb-5 ${
                        mode ? "text-black" : "text-white"
                      } text-center`}
                    >
                      Date of Birth: {user.dateOfBirth}
                    </h1>
                  ) : (
                    ""
                  )}

                  {/* mobile menu */}
                  {/* other info */}
                  <div className="lg:hidden">
                    <div className="flex justify-between items-center">
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
                          className={`mt-1 ${
                            mode ? "text-black" : "text-white"
                          }`}
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
                          className={`mt-1 ${
                            mode ? "text-black" : "text-white"
                          }`}
                        >
                          {user.userPosts.length === 1
                            ? `${user.userPosts.length} post`
                            : `${user.userPosts.length} posts`}
                        </h1>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
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
                          className={`mt-1 ${
                            mode ? "text-black" : "text-white"
                          }`}
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
                                  onClick={() =>
                                    navigate(`/users/${follow.userName}`)
                                  }
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
                              {user.userName} currently follow no one!
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
                          className={`mt-1 ${
                            mode ? "text-black" : "text-white"
                          }`}
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
                              {user.userName} currently have no followers!
                            </div>
                          )}
                        </div>
                      </Popover>
                    </div>
                  </div>

                  {/* desktop menu */}
                  {/* other info */}
                  <div className="hidden lg:flex lg:items-center lg:space-x-16 lg:justify-center">
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
                                onClick={() =>
                                  navigate(`/users/${follow.userName}`)
                                }
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
                            {user.userName} currently follow no one!
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
                            {user.userName} currently have no followers!
                          </div>
                        )}
                      </div>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            <h1
              className={`text-center text-lg italic underline ${
                mode ? "text-black" : "text-white"
              }`}
            >
              POSTS
            </h1>

            <div className="flex flex-col justify-center items-center">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className={`${
                      mode ? "bg-white" : "bg-transparent border"
                    } p-7 md:min-w-[450px] lg:min-w-[600px] md:w-[50vw] max-w-[100%] min-w-[270px] w-[90vw] overflow-hidden  rounded-[20px] mt-10 shadow-md`}
                  >
                    {/* user data */}
                    <div className="flex justify-between">
                      {/* left top section */}

                      <div className="flex items-center space-x-5">
                        <a href={`/users/${post.userName}`}>
                          <img
                            src={post.userPicturePath}
                            alt="bezal"
                            className="w-[40px] h-[40px] rounded-full"
                          />
                        </a>
                        <div>
                          <a href={`/${post.userName}`}>
                            <button
                              className={` ${
                                mode ? "text-black" : "text-white"
                              } font-semibold`}
                            >
                              {post.userName}
                            </button>
                          </a>
                          <h1
                            className={` ${
                              mode ? "text-[#AAAAAA]" : "text-white"
                            } text-sm`}
                          >
                            {formatTimeAgo(post.createdAt)}
                          </h1>
                        </div>
                      </div>

                      {/* right top section */}
                      <div className="flex items-center space-x-5">
                        <h1
                          className={`${
                            mode ? "text-[#AAAAAA]" : "text-white"
                          }`}
                        >
                          {post.views} {post.views == 1 ? "view" : "views"}
                        </h1>
                        <button onClick={() => handleDialogOpen(post.userId)}>
                          <svg
                            width="15"
                            height="35"
                            viewBox="0 0 15 35"
                            className={`hover:fill-[#4385F5] ${
                              mode ? "fill-[#C4C4C4]" : "fill-white"
                            }`}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="7.5" cy="7.5" r="2.5" fill="" />
                            <circle cx="7.5" cy="17.5" r="2.5" fill="" />
                            <circle cx="7.5" cy="27.5" r="2.5" fill="" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* main content section */}
                    <div className={`${mode ? "" : "text-white"} mt-3`}>
                      <a href={`/posts/${post._id}`}>
                        <p>{post.postMessage}</p>
                      </a>
                      <div
                        className={`mt-10 grid gap-2 ${
                          post.picturePath.length >= 2 && "grid-cols-2"
                        } ${post.picturePath.length == 4 && "grid-cols-4"}`}
                      >
                        {post.picturePath.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={`Post Image ${index}`}
                            className="rounded-[20px] h-[250px] object-cover w-full"
                          />
                        ))}
                      </div>
                    </div>
                    {/* post activity section */}
                    {/* top menu */}
                    <div className="flex justify-between items-center mt-7">
                      <div className="flex items-center space-x-7">
                        {/* like menu */}
                        <div
                          className={`flex items-center space-x-3 ${
                            mode ? "text-[#5D5F63]" : "text-white"
                          } `}
                        >
                          <button onClick={() => likePost(post._id)}>
                            <svg
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${
                                loggedInUser.likes[post._id]
                                  ? "fill-red-500"
                                  : mode
                                  ? "fill-[#5D5F63]"
                                  : "fill-white"
                              }`}
                            >
                              <g clip-path="url(#clip0_1_175)">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M1.1543 8.40235H5.60742C5.96712 8.40235 6.26172 8.74335 6.26172 9.16158V19.2426C6.26172 19.6589 5.96712 20.0018 5.60742 20.0018H1.1543C0.794596 20.0018 0.5 19.6608 0.5 19.2426V9.16158C0.5 8.74335 0.794596 8.40235 1.1543 8.40235ZM10.7637 0.840182C11.1087 -1.18506 13.9733 0.680046 14.1621 3.94493C14.2191 4.94342 14.1296 6.10582 13.918 7.40386H18.0114C19.7139 7.4811 21.1999 8.89218 20.1501 11.2094C20.3893 12.2192 20.4251 13.4042 19.7757 13.8715C19.8571 15.4653 19.4762 16.4525 18.7633 17.2324C18.7161 18.0293 18.5697 18.7377 18.2376 19.2822C17.6875 20.1808 17.2415 19.966 16.3757 19.966H9.46322C8.36784 19.966 7.77051 19.6175 7.05436 18.5776V9.66648C9.11491 9.02217 10.2103 5.75917 10.7637 3.61712V0.840182Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_175">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <h1 className="mt-2">
                            {Object.keys(post.likes).length}
                          </h1>
                        </div>

                        {/* dislike menu */}
                        <div
                          className={`flex items-center space-x-3 ${
                            mode ? "text-[#5D5F63]" : "text-white"
                          } `}
                        >
                          <button
                            className="mt-1"
                            onClick={() => dislikePost(post._id)}
                          >
                            <svg
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className={`${
                                loggedInUser.dislikes[post._id]
                                  ? "fill-red-500"
                                  : mode
                                  ? "fill-[#5D5F63]"
                                  : "fill-white"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1_183)">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M19.9438 12.858L16.1587 12.858C15.8529 12.858 15.6025 12.5681 15.6025 12.2126L15.6025 3.64378C15.6025 3.28988 15.8529 2.99843 16.1587 2.99843L19.9438 2.99843C20.2496 2.99843 20.5 3.28828 20.5 3.64378L20.5 12.2126C20.5 12.5681 20.2496 12.858 19.9438 12.858ZM11.7759 19.2858C11.4826 21.0073 9.04769 19.4219 8.88721 16.6468C8.83878 15.7981 8.91487 14.81 9.09472 13.7067L5.61531 13.7067C4.16821 13.641 2.90511 12.4416 3.79744 10.472C3.59407 9.61364 3.56364 8.60638 4.11564 8.20925C4.04646 6.8545 4.3702 6.01539 4.97615 5.35243C5.01627 4.67505 5.14079 4.07294 5.42301 3.61015C5.89062 2.84631 6.26969 3.02886 7.00569 3.02886L12.8813 3.02886C13.8123 3.02886 14.3201 3.32511 14.9288 4.20906L14.9288 11.7835C13.1773 12.3311 12.2463 15.1047 11.7759 16.9254L11.7759 19.2858Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_183">
                                  <rect
                                    width="17"
                                    height="17"
                                    fill="white"
                                    transform="matrix(-1 0 0 -1 20.5 20)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <h1 className="mt-2">
                            {Object.keys(post.dislikes).length}
                          </h1>
                        </div>

                        {/* repost menu */}
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() =>
                              sharePost(
                                `${window.location.origin}/posts/${post._id}`
                              )
                            }
                          >
                            <svg
                              width="26"
                              height="20"
                              viewBox="0 0 26 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${
                                mode ? "fill-[#5D5F63]" : "fill-white"
                              }`}
                            >
                              <path
                                d="M24.4922 13.0781C24.3476 12.7266 24.0039 12.4648 23.625 12.4648H21.75V6.875C21.75 5.15234 20.3476 3.75 18.625 3.75H13.625C12.9347 3.75 12.375 4.30898 12.375 5C12.375 5.69102 12.9347 6.25 13.625 6.25H18.625C18.9687 6.25 19.25 6.53125 19.25 6.875V12.4648H17.375C17.1895 12.4649 17.0083 12.52 16.8542 12.623C16.7 12.7261 16.5799 12.8726 16.509 13.0439C16.438 13.2152 16.4195 13.4037 16.4556 13.5856C16.4918 13.7674 16.5811 13.9345 16.7122 14.0656L19.8372 17.1914C20.0195 17.4102 20.2617 17.5 20.5 17.5C20.7383 17.5 20.9797 17.4084 21.1629 17.2254L24.2879 14.0996C24.5547 13.832 24.6367 13.4297 24.4922 13.0781ZM12.375 13.75H7.37497C7.03122 13.75 6.74997 13.4688 6.74997 13.125V7.5H8.62497C8.8104 7.49991 8.99163 7.44486 9.14578 7.3418C9.29992 7.23873 9.42005 7.09228 9.49099 6.92096C9.56192 6.74964 9.58047 6.56113 9.54429 6.37927C9.50812 6.19741 9.41884 6.03035 9.28774 5.89922L6.16274 2.77344C5.98044 2.59141 5.73825 2.5 5.49997 2.5C5.26169 2.5 5.0195 2.59141 4.83591 2.77461L1.71091 5.90039C1.44411 6.16797 1.36364 6.57031 1.50895 6.92188C1.65427 7.27344 1.99606 7.5 2.37497 7.5H4.24997V13.125C4.24997 14.8477 5.65231 16.25 7.37497 16.25H12.375C13.0652 16.25 13.625 15.691 13.625 15C13.625 14.309 13.0664 13.75 12.375 13.75Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>

                        {/* comment menu */}
                        <div
                          className={`flex items-center space-x-3 mt-1 ${
                            mode ? "text-[#5D5F63]" : "text-white"
                          } `}
                        >
                          <button>
                            <svg
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className={`${
                                mode ? "fill-[#5D5F63]" : "fill-white"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1_193)">
                                <path
                                  d="M10.5 0.5C4.98597 0.5 0.499966 4.53733 0.499966 9.5C0.499966 11.235 1.04897 12.9153 2.0893 14.368C1.8923 16.547 1.3643 18.1647 0.597633 18.931C0.496299 19.0323 0.470966 19.1873 0.534966 19.3153C0.591966 19.4297 0.708299 19.5 0.833299 19.5C0.848633 19.5 0.864299 19.499 0.879966 19.4967C1.01497 19.4777 4.15097 19.026 6.41897 17.7173C7.7073 18.237 9.0793 18.5 10.5 18.5C16.014 18.5 20.5 14.4627 20.5 9.5C20.5 4.53733 16.014 0.5 10.5 0.5Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_193">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <h1>{post.comments.length}</h1>
                        </div>
                      </div>

                      {/* tip option */}
                      <div>
                        <button
                          onClick={() => handleTipClick(post.userId)}
                          className={`hover:text-[#4385F5] ${
                            mode ? "text-[#5D5F63]" : "text-white"
                          }`}
                        >
                          $ Tip
                        </button>
                      </div>
                    </div>

                    {/* view comments */}
                    <div className="mt-5">
                      <a href={`/posts/${post._id}`}>
                        <button className="text-[#4385F5]">
                          View {post.comments.length} comments
                        </button>
                      </a>
                    </div>

                    {/* bottom menu */}
                    <div className="bg-[#E5E5E5] w-full h-[1px] mt-8"></div>

                    {/* comment bar */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-5 mt-5 w-full">
                        <img
                          src="https://i.ibb.co/KsMc2Qn/bezal.png"
                          alt="bezal"
                          className="w-[40px] h-[40px] mt-[-10px] rounded-full"
                        />
                        {/* post textfield */}
                        <textarea
                          onChange={handleCommentMessageChange}
                          value={commentMessage}
                          className={`min-h-[40px] w-[100%] pt-3 resize-none border-none  ${
                            mode
                              ? "bg-white text-black"
                              : "bg-transparent text-white"
                          } outline-none  placeholder-[#C5C7C8] `}
                          placeholder="Write a comment"
                        ></textarea>
                      </div>

                      {/* gallery section */}
                      <div className="flex items-center space-x-3">
                        {/* submit comment button */}
                        <button
                          onClick={() => submitComment(post._id)}
                          className={` ${
                            mode ? "text-[#AAAAAA]" : "text-white"
                          }`}
                        >
                          <SendIcon />
                        </button>
                      </div>
                    </div>

                    {/* alert menu */}
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

                    {/* dialog menu */}
                    <Dialog
                      open={openDialog}
                      onClose={handleDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Delete post?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this post?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={() => deletePost(post._id)} autoFocus>
                          Delete Post
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                ))
              ) : (
                <div
                  className={`${
                    mode ? "text-black" : "text-white"
                  } text-center py-10`}
                >
                  No posts to display
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
