import LeftBar from "../components/LeftBar";
import MiddleBar from "../components/MiddleBar";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";

const Home = () => {
  return (
    <div className="bg-[#FAFAFA]">
      <Navbar />
      <div className="flex">
        <LeftBar />
        <MiddleBar />
        <RightBar />
      </div>
    </div>
  );
};
export default Home;
