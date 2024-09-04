import { useSelector } from "react-redux";
import LeftBar from "../components/LeftBar";

import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";
import { RootState } from "../states/store";
import { useTheme } from "@mui/material";
import FriendList from "../components/FriendList";

const Friends = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const theme = useTheme();

  return (
    <div
      style={{
        background: mode
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="flex">
        <LeftBar />
        <FriendList />
        <RightBar />
      </div>
    </div>
  );
};
export default Friends;
