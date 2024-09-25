import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { User } from "./ChatPage";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  if (!currentConversation) {
    return <div>No user selected</div>;
  }

  return (
    <div className={`${mode ? "text-black" : "text-white"} px-5 py-5`}>
      <div
        onClick={() =>
          navigate(`/users/${currentConversation?.otherMember.userName}`)
        }
        className="flex flex-col space-y-2 justify-center items-center"
      >
        <img
          src={currentConversation?.otherMember?.profileImage}
          alt={`${currentConversation?.otherMember.userName}'s profile`}
          className="w-[50px] h-[50px] object-cover rounded-full"
        />
        <h1>{currentConversation?.otherMember.userName}</h1>
      </div>
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
                <div
                  className={`flex flex-col p-3 ${
                    message.text == "" ? "" : "bg-gray-500"
                  } max-w-[60%] rounded-xl`}
                >
                  <p>{message.text}</p>
                  <div
                    className={`grid gap-2 mt-2 ${
                      message.images.length >= 2 && "grid-cols-2"
                    } ${message.images.length == 4 && "grid-cols-4"}`}
                  >
                    {message.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className={`rounded-[20px] py-1 h-[180px] w-[200px] ${
                          message.images.length == 1
                            ? "object cover"
                            : "object-cover"
                        }  `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Render other user's messages
              <div className="flex items-start justify-start space-x-3 my-2">
                <div className="bg-blue-600 flex flex-col p-3 rounded-xl max-w-2/4">
                  <p>{message.text}</p>
                  <div
                    className={`grid gap-2 mt-2 ${
                      message.images.length >= 2 && "grid-cols-2"
                    } ${message.images.length == 4 && "grid-cols-4"}`}
                  >
                    {message.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Post Image ${index}`}
                        className={`rounded-[20px] h-[250px] w-[300px] ${
                          message.images.length == 1
                            ? "object-cover"
                            : "object-contain"
                        }  `}
                      />
                    ))}
                  </div>
                </div>
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
