import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";
import SinglePost from "../components/SinglePost";
import { useTheme } from "@mui/material";
import { RootState } from "../states/store";
import LeftBar from "../components/LeftBar";

const Post = () => {
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
        <SinglePost />
        <RightBar />
      </div>
    </div>
  );
};
export default Post;
