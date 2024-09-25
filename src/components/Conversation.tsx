import { RootState } from "../states/store";
import { useSelector } from "react-redux";
import axios from "axios";

interface ConversationProps {
  conversation: any; // Consider typing this more strictly if possible
  currentConversation: any;
  setCurrentConversation: any;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentConversation,
  setCurrentConversation,
}) => {
  const mode = useSelector((state: RootState) => state.user.mode);

  const handleConversationClick = async () => {
    try {
      if (conversation?.conversation?._id) {
        setCurrentConversation(conversation);
      } else {
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(
          `${backendURL}/conversations`,
          {
            sender: conversation.senderId,
            receiver: conversation.otherMember._id,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCurrentConversation({
            otherMember: conversation.otherMember,
            conversation: response.data,
          });
        }
      }
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  // Defensive check to prevent rendering issues
  if (!conversation || !conversation.otherMember) {
    return null; // Or some loading/error state
  }

  return (
    <div>
      <button
        onClick={handleConversationClick}
        className={`flex w-full space-x-3 mt-5 hover:bg-gray-300 p-3 ${
          currentConversation?.conversation?._id ===
          conversation.conversation?._id
            ? "bg-gray-400"
            : ""
        }`}
      >
        <img
          src={conversation.otherMember.profileImage}
          alt={`${conversation.otherMember.userName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <h1 className={`${mode ? "text-black" : "text-white"}`}>
          {conversation.otherMember.userName}
        </h1>
      </button>
    </div>
  );
};

export default Conversation;
