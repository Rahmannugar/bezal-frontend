import { User } from "../pages/ChatPage";
import { RootState } from "../states/store";
import { useSelector } from "react-redux";

interface ConversationProps {
  conversation: any;
  currentChat: User | null;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentChat,
}) => {
  const mode = useSelector((state: RootState) => state.user.mode);

  return (
    <div>
      <button className="flex w-full space-x-3 mt-5 hover:bg-gray-300 p-3">
        <img
          src={currentChat?.profileImage}
          alt={`${currentChat?.firstName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <h1 className={`${mode ? "text-black" : "text-white"} `}>
          {currentChat?.userName}
        </h1>
      </button>
      <button className="flex w-full space-x-3 mt-5 hover:bg-gray-300 p-3">
        <img
          src={conversation.otherMember.profileImage}
          alt={`${conversation.otherMember.firstName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <h1 className={`${mode ? "text-black" : "text-white"} `}>
          {conversation.otherMember.userName}
        </h1>
      </button>
      ;
    </div>
  );
};
export default Conversation;
