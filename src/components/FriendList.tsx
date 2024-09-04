import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const FriendList = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const mode = useSelector((state: RootState) => state.user.mode);

  const navigate = useNavigate();

  // Backend URL from environment
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
  }, []);
  return (
    <div
      className={`${
        mode ? "bg-white text-[#5D5F63]" : "bg-transparent border text-white"
      } p-7 min-w-[600px] flex justify-between w-[50vw] max-w-[100%]  rounded-[20px] mt-10 shadow-md`}
    >
      <div className="border-r w-1/2">
        <h1>Followers</h1>
        <div>
          {followerResults.length > 0 ? (
            followerResults.map((follower) => (
              <button className="hover:text-[#4385F5]">
                <div
                  key={follower._id}
                  className="flex items-center justify-center space-x-3 mt-5"
                  onClick={() => navigate(`/users/${follower.userName}`)}
                >
                  <img
                    src={follower.profileImage}
                    alt={`${follower.userName}'s profile`}
                    className="w-[30px] h-[30px] object-cover rounded-full"
                  />
                  <div>
                    <span>{follower.userName}</span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="mt-5">You currently have no follower!</div>
          )}
        </div>
      </div>
      <div className="w-1/2 border-l px-5">
        <h1>Following</h1>
        {followResults.length > 0 ? (
          followResults.map((follow) => (
            <button className="hover:text-[#4385F5]">
              <div
                key={follow._id}
                className="flex items-center justify-center space-x-3 mt-5"
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
          <div className="mt-5">You currently follow no one!</div>
        )}
      </div>
    </div>
  );
};
export default FriendList;
