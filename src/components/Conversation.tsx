import { RootState } from "../states/store";
import { useSelector } from "react-redux";

interface ConversationProps {
  conversation: any;
  currentChat: any;
  setCurrentChat: (otherMember: any, conversation: any) => void;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentChat,
  setCurrentChat,
}) => {
  const mode = useSelector((state: RootState) => state.user.mode);

  return (
    <div>
      <button
        onClick={() =>
          setCurrentChat(conversation.otherMember, conversation.conversation)
        }
        className={`flex w-full space-x-3 mt-5 hover:bg-gray-300 p-3 ${
          currentChat ? "bg-gray-400" : ""
        }`}
      >
        <img
          src={conversation.otherMember.profileImage}
          alt={`${conversation.otherMember.userName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <h1 className={`${mode ? "text-black" : "text-white"} `}>
          {conversation.otherMember.userName}
        </h1>
      </button>
    </div>
  );
};

export default Conversation;
