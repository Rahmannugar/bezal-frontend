import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../states/store";
import { setUser } from "../states/userSlice";
import Picker, { EmojiClickData } from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";

const SinglePost = () => {
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
  interface Comment {
    _id: string;
    userName: string;
    userPicturePath: string;
    createdAt: string;
    commentMessage: string;
  }

  const mode = useSelector((state: RootState) => state.user.mode);
  const user = useSelector((state: RootState) => state.user.user);

  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Backend URL from environment
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backendURL}/posts/post/${postId}`);
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHrs > 0) {
      return diffInHrs + " hours ago";
    } else if (diffInMins > 0) {
      return diffInMins + " minutes ago";
    } else {
      return "Just now";
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

      setPost((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        };
      });

      const updatedLikes = { ...user.likes };
      const updatedDislikes = { ...user.dislikes };

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
          ...user,
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

      setPost((prevPost) => {
        if (!prevPost) return null;

        return {
          ...prevPost,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        };
      });

      const updatedLikes = { ...user.likes };
      const updatedDislikes = { ...user.dislikes };

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
          ...user,
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
    if (postUserId == user._id) {
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
    if (postUserId == user._id) {
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
          navigate(`/`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  //handle emoji
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setCommentMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
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
        setCommentMessage("");
        const newComment = response.data;
        setComments((prevComments) => [newComment, ...prevComments]);

        setResponseMessage("You've successfully commented on this post");
        setResponseSeverity("success");
        setOpenSnackbar(true);
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
      {post ? (
        <div>
          <div
            key={post._id}
            className={`${
              mode ? "bg-white" : "bg-transparent border"
            } p-7 min-w-[600px] w-[50vw] max-w-[100%]  rounded-[20px] mt-10 shadow-md`}
          >
            {/* user data */}
            <div className="flex justify-between">
              {/* left top section */}

              <div className="flex items-center space-x-5">
                <a href={`/${post.userName}`}>
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
                <h1 className={`${mode ? "text-[#AAAAAA]" : "text-white"}`}>
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
                        user.likes[post._id]
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
                  <h1 className="mt-2">{Object.keys(post.likes).length}</h1>
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
                        user.dislikes[post._id]
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
                  <h1 className="mt-2">{Object.keys(post.dislikes).length}</h1>
                </div>

                {/* repost menu */}
                <div className="flex items-center mt-1">
                  <button
                    onClick={() =>
                      sharePost(`${window.location.origin}/posts/${post._id}`)
                    }
                  >
                    <svg
                      width="26"
                      height="20"
                      viewBox="0 0 26 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${mode ? "fill-[#5D5F63]" : "fill-white"}`}
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
                      className={`${mode ? "fill-[#5D5F63]" : "fill-white"}`}
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

            {/* bottom menu */}
            <div className="bg-[#E5E5E5] w-full h-[1px] mt-8"></div>

            {/* comment bar */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-5 mt-5 w-full">
                <img
                  src={user.profileImage}
                  alt="bezal"
                  className="w-[40px] h-[40px] mt-[-10px] rounded-full"
                />
                {/* post textfield */}
                <textarea
                  onChange={handleCommentMessageChange}
                  className={`min-h-[40px] w-[100%] pt-3 resize-none border-none  ${
                    mode ? "bg-white text-black" : "bg-transparent text-white"
                  } outline-none  placeholder-[#C5C7C8] `}
                  placeholder="Write a comment"
                  value={commentMessage}
                ></textarea>
              </div>

              {/* gallery section */}
              <div className="flex items-center pl-1 space-x-2">
                {/* emoji button */}
                <button>
                  <em
                    data-emoji=":grin:"
                    className="small link"
                    onClick={() => setShowPicker((val) => !val)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={` ${mode ? "fill-[#AAAAAA]" : "fill-white"}`}
                    >
                      <path
                        d="M1.42859 10C1.42859 5.26645 5.26645 1.42859 10 1.42859C14.7336 1.42859 18.5714 5.26645 18.5714 10C18.5714 14.7336 14.7336 18.5714 10 18.5714C5.26645 18.5714 1.42859 14.7336 1.42859 10ZM12.5 9.28573C12.7842 9.28573 13.0567 9.17285 13.2576 8.97192C13.4586 8.77099 13.5714 8.49846 13.5714 8.2143C13.5714 7.93014 13.4586 7.65762 13.2576 7.45669C13.0567 7.25576 12.7842 7.14288 12.5 7.14288C12.2159 7.14288 11.9433 7.25576 11.7424 7.45669C11.5415 7.65762 11.4286 7.93014 11.4286 8.2143C11.4286 8.49846 11.5415 8.77099 11.7424 8.97192C11.9433 9.17285 12.2159 9.28573 12.5 9.28573ZM8.57145 8.2143C8.57145 7.93014 8.45856 7.65762 8.25763 7.45669C8.0567 7.25576 7.78418 7.14288 7.50002 7.14288C7.21586 7.14288 6.94334 7.25576 6.7424 7.45669C6.54147 7.65762 6.42859 7.93014 6.42859 8.2143C6.42859 8.49846 6.54147 8.77099 6.7424 8.97192C6.94334 9.17285 7.21586 9.28573 7.50002 9.28573C7.78418 9.28573 8.0567 9.17285 8.25763 8.97192C8.45856 8.77099 8.57145 8.49846 8.57145 8.2143ZM5.94859 12.2357C5.83114 12.3157 5.75025 12.439 5.72373 12.5786C5.69721 12.7182 5.72722 12.8626 5.80716 12.98V12.9807L5.80859 12.9822L5.81002 12.9843L5.81573 12.9914C5.83799 13.0232 5.8611 13.0545 5.88502 13.085C5.93145 13.1443 5.99788 13.225 6.08502 13.32C6.31978 13.5745 6.57994 13.8042 6.86145 14.0057C7.5543 14.505 8.59859 15 10 15C11.4014 15 12.4464 14.5043 13.1386 14.0064C13.4203 13.8044 13.6807 13.5742 13.9157 13.3193C14.0054 13.2217 14.09 13.1197 14.1693 13.0136L14.185 12.9922L14.19 12.985L14.1914 12.9822L14.1922 12.9807L14.1929 12.98C14.273 12.8627 14.3032 12.7183 14.2769 12.5786C14.2506 12.439 14.1699 12.3155 14.0525 12.2354C13.9352 12.1552 13.7908 12.125 13.6511 12.1513C13.5115 12.1777 13.388 12.2584 13.3079 12.3757L13.3029 12.3829C13.2475 12.4563 13.1886 12.5271 13.1264 12.595C12.9408 12.7958 12.7352 12.9772 12.5129 13.1364C11.9643 13.5314 11.1343 13.9286 10 13.9286C8.86645 13.9286 8.03573 13.5314 7.48716 13.1364C7.26507 12.9775 7.05973 12.7963 6.8743 12.5957C6.81216 12.5279 6.75329 12.4571 6.69788 12.3836L6.69145 12.375C6.61119 12.2583 6.48798 12.1781 6.34877 12.152C6.20956 12.1259 6.06567 12.156 5.94859 12.2357Z"
                        fill=""
                      />
                    </svg>
                  </em>
                </button>

                <div className={`${!showPicker ? "hidden" : ""}`}>
                  {showPicker && (
                    <Picker
                      onEmojiClick={onEmojiClick}
                      reactionsDefaultOpen={true}
                    />
                  )}
                </div>

                {/* submit comment button */}
                <button
                  onClick={() => submitComment(post._id)}
                  className={` ${mode ? "text-[#AAAAAA]" : "text-white"}`}
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
              <DialogTitle id="alert-dialog-title">Delete post?</DialogTitle>
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

          {/* //comments section */}
          <div
            className={`${
              mode
                ? "bg-white text-[#AAAAAA]"
                : "text-white bg-transparent border"
            } py-4 min-w-[600px] w-[50vw] max-w-[100%]  rounded-[20px] mt-5 shadow-md`}
          >
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div id={comment._id} className="mt-3">
                  <div className="flex space-x-2 px-7 items-center">
                    <a href={`/${comment.userName}`}>
                      <img
                        src={comment.userPicturePath}
                        className="w-[40px] h-[40px] object-cover rounded-full"
                        alt="userImage"
                      />
                    </a>

                    <div>
                      <a href={`/${comment.userName}`}>
                        <button>{comment.userName}</button>
                      </a>
                      <h1 className={`text-sm`}>
                        {formatTimeAgo(comment.createdAt)}
                      </h1>
                    </div>
                  </div>
                  <p className="mt-1 px-7">{comment.commentMessage}</p>
                  {/* bottom menu */}
                  <div className="bg-[#E5E5E5] w-full h-[1px] mt-4"></div>
                </div>
              ))
            ) : (
              <div
                className={`${
                  mode ? "text-black" : "text-white"
                } text-center py-10`}
              >
                No comments to display
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`${mode ? "text-black" : "text-white"} text-center py-10`}
        >
          No post to display
        </div>
      )}
    </div>
  );
};
export default SinglePost;
