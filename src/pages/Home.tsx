import { useSelector } from "react-redux";
import LeftBar from "../components/LeftBar";
import MiddleBar from "../components/MiddleBar";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";
import { RootState } from "../states/store";
import { useTheme } from "@mui/material";

const Home = () => {
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
      <div className="flex justify-center items-center md:justify-start md:items-start">
        <LeftBar />
        <MiddleBar />
        <RightBar />
      </div>
    </div>
  );
};
export default Home;
