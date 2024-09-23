import { RootState } from "../states/store";
import { useSelector } from "react-redux";

interface ConversationProps {
  conversation: any;
  currentConversation: any;
  setCurrentConversation: any;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentConversation,
  setCurrentConversation,
}) => {
  const mode = useSelector((state: RootState) => state.user.mode);

  return (
    <div>
      <button
        onClick={() =>
          setCurrentConversation(conversation, conversation.otherMember)
        }
        className={`flex w-full space-x-3 mt-5 hover:bg-gray-300 p-3 ${
          currentConversation?.conversation._id ===
          conversation.conversation._id
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
