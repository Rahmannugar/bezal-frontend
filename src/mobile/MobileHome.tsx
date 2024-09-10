import { useSelector } from "react-redux";
import MiddleBar from "../components/MiddleBar";
import { RootState } from "../states/store";
import { useTheme } from "@mui/material";

const MobileHome = () => {
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
      <div className="flex">
        <MiddleBar />
      </div>
    </div>
  );
};
export default MobileHome;
