import { RootState } from "../states/store";
import { useSelector } from "react-redux";
import axios from "axios";

interface ConversationProps {
  conversation: any;
  currentConversation: any;
  setCurrentConversation: any;
  setVisible: any;
  messages: any;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentConversation,
  setCurrentConversation,
  setVisible,
  messages,
}) => {
  const mode = useSelector((state: RootState) => state.user.mode);

  const handleConversationClick = async () => {
    try {
      if (conversation?.conversation?._id) {
        setCurrentConversation(conversation);
        setVisible(true);
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
          setVisible(true);
        }
      }
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  if (!conversation || !conversation.otherMember) {
    return null;
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
        <div className="flex flex-col">
          <h1 className={`${mode ? "text-black" : "text-white"}`}>
            {conversation.otherMember.userName}
          </h1>
          <p className={`${mode ? "text-gray-600" : "text-gray-300"}`}></p>
        </div>
      </button>
    </div>
  );
};

export default Conversation;
