import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { User } from "./ChatPage";

interface ChatProps {
  currentConversation: any;
  messages: any[];
}

const Chat: React.FC<ChatProps> = ({ currentConversation, messages }) => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const loggedInUser = useSelector((state: RootState) => state.user.user);

  const formatTimeAgo = (timestamp: string) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 7) {
      return postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else if (diffInDays > 0) {
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    } else if (diffInHrs > 0) {
      return diffInHrs === 1 ? "1 hour ago" : `${diffInHrs} hours ago`;
    } else if (diffInMins > 0) {
      return diffInMins === 1 ? "1 minute ago" : `${diffInMins} minutes ago`;
    } else {
      return "Just now";
    }
  };

  if (!currentConversation) {
    return <div>No user selected</div>;
  }

  return (
    <div className={`${mode ? "text-black" : "text-white"} px-5 py-5`}>
      {messages.map((message, index) => {
        const isLoggedInUserMessage = message.senderId === loggedInUser._id;

        return (
          <div
            key={index}
            className={`${mode ? " text-black" : " text-white "}   px-5 py-5`}
          >
            {/* Render logged-in user messages */}
            {isLoggedInUserMessage ? (
              <div className="flex items-end justify-end space-x-3 my-2">
                <p className="bg-gray-500 rounded-xl py-2 px-2 w-2/4">
                  {message.text}
                </p>
                <img
                  src={loggedInUser.profileImage}
                  alt={`${loggedInUser.firstName}'s profile`}
                  className="w-[30px] h-[30px] object-cover rounded-full"
                />
              </div>
            ) : (
              // Render other user's messages
              <div className="flex items-start justify-start space-x-3 my-2">
                <img
                  src={currentConversation?.otherMember?.profileImage}
                  alt={`${currentConversation?.userName}'s profile`}
                  className="w-[30px] h-[30px] object-cover rounded-full"
                />
                <p className="bg-blue-600 rounded-xl py-2 px-2 w-2/4">
                  {message.text}
                </p>
              </div>
            )}
            {/* Time formatting for both users */}
            <h1
              className={`mt-2 text-xs ${
                isLoggedInUserMessage ? "text-right" : "text-left"
              }`}
            >
              {formatTimeAgo(message.createdAt)}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
