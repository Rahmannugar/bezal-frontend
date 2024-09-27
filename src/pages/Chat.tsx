import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Key, useEffect } from "react";

interface ChatProps {
  currentConversation: any;
  messages: any[];
  setVisible: any;
  scrollRef: any;
}

const Chat: React.FC<ChatProps> = ({
  currentConversation,
  messages,
  setVisible,
  scrollRef,
}) => {
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

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleVisible = () => {
    setVisible(false);
  };
  const navigate = useNavigate();

  if (!currentConversation) {
    return <div>No user selected</div>;
  }

  return (
    <div className={`${mode ? "text-black" : "text-white"} p-5`}>
      <div className="relative lg:flex justify-center">
        {/* Header section with fixed positioning */}
        <div className="flex items-center justify-between lg:justify-center w-full lg:hidden fixed top-0 left-0 bg-blue-500 p-4 z-10">
          {/* Back arrow button */}
          <button onClick={handleVisible} className="lg:hidden py-2 px-3">
            <ArrowBackIosIcon />
          </button>

          {/* User profile section */}
          <div
            onClick={() =>
              navigate(`/users/${currentConversation?.otherMember.userName}`)
            }
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={currentConversation?.otherMember?.profileImage}
              alt={`${currentConversation?.otherMember.userName}'s profile`}
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
            <h1 className="text-center">
              {currentConversation?.otherMember.userName}
            </h1>
          </div>

          {/* Empty div to maintain alignment */}
          <div className="w-[50px] h-[50px]"></div>
        </div>
      </div>

      {/* Apply padding to avoid content being hidden under the fixed header */}
      <div className="pt-[80px]">
        {messages.map((message, index) => {
          const isLoggedInUserMessage = message.senderId === loggedInUser._id;

          return (
            <div
              key={index}
              className={`${mode ? " text-black" : " text-white "} py-5`}
            >
              {/* Render logged-in user messages */}
              {isLoggedInUserMessage ? (
                <div className="flex items-end justify-end  space-x-3">
                  <div
                    className={`flex flex-col p-3 ${
                      message.text == "" ? "" : "bg-blue-600"
                    }  rounded-xl`}
                  >
                    <p className="text-justify break-all">{message.text}</p>
                    <div
                      className={`grid gap-2 mt-2 ${
                        message.images.length >= 2 && "grid-cols-2"
                      } ${message.images.length == 4 && "grid-cols-4"}`}
                    >
                      {message.images.map((imageUrl: string | undefined, index: Key | null | undefined) => (
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
                  <div className="bg-gray-500 flex flex-col p-3 rounded-xl max-w-2/4">
                    <p className="text-justify break-all">{message.text}</p>
                    <div
                      className={`grid gap-2 mt-2 ${
                        message.images.length >= 2 && "grid-cols-2"
                      } ${message.images.length == 4 && "grid-cols-4"}`}
                    >
                      {message.images.map((imageUrl: string | undefined, index: Key | null | undefined) => (
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

      <div ref={scrollRef} />
    </div>
  );
};

export default Chat;
``;
