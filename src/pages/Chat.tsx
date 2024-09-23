import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { User } from "./ChatPage";

interface ChatProps {
  currentChat: User | null;
}

const Chat: React.FC<ChatProps> = ({ currentChat }) => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const loggedInUser = useSelector((state: RootState) => state.user.user);
  if (!currentChat) {
    return <div>No user selected</div>;
  }
  return (
    <div className={`${mode ? " text-black" : " text-white "}   px-5 py-5`}>
      {/* external-messages */}
      <div className="flex items-start justify-start space-x-3">
        <img
          src={currentChat?.profileImage}
          alt={`${currentChat?.firstName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <p className="bg-blue-600 rounded-xl py-2 px-2 w-2/4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          quaerat deleniti perferendis amet ipsam enim cum pariatur consequatur
          mollitia dignissimos quam quo, voluptas qui. Voluptatem enim, neque
          architecto harum est ut maxime officiis tenetur explicabo accusamus
          itaque a voluptate nisi animi aperiam ab expedita at blanditiis
          dolorem ipsam natus et.
        </p>
      </div>
      <h1 className="mt-2 text-xs">1 hour ago</h1>

      {/* user-messages */}
      <div className="flex items-end justify-end space-x-3">
        <img
          src={loggedInUser.profileImage}
          alt={`${loggedInUser.firstName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <p className="bg-gray-500 rounded-xl py-2 px-2 w-2/4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil q
        </p>
      </div>
      <h1 className="mt-2 text-xs justify-end flex items-end">1 hour ago</h1>

      {/* external-messages */}
      <div className="flex items-start justify-start space-x-3">
        <img
          src={currentChat?.profileImage}
          alt={`${currentChat?.firstName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <p className="bg-blue-600 rounded-xl py-2 px-2 w-2/4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          quaerat deleniti perferendis amet ipsam enim cum pariatur consequatur
          mollitia dignissimos quam quo, voluptas qui. Voluptatem enim, neque
          architecto harum est ut maxime officiis tenetur explicabo accusamus
          itaque a voluptate nisi animi aperiam ab expedita at blanditiis
          dolorem ipsam natus et.
        </p>
      </div>
      <h1 className="mt-2 text-xs">1 hour ago</h1>

      {/* user-messages */}
      <div className="flex items-end justify-end space-x-3">
        <img
          src={loggedInUser.profileImage}
          alt={`${loggedInUser.firstName}'s profile`}
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
        <p className="bg-gray-500 rounded-xl py-2 px-2 w-2/4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil q
        </p>
      </div>
      <h1 className="mt-2 text-xs justify-end flex items-end">1 hour ago</h1>
    </div>
  );
};
export default Chat;
