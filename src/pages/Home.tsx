import LeftBar from "../components/LeftBar";
import MiddleBar from "../components/MiddleBar";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#FAFAFA]">
      <Navbar />
      <div className="flex">
        <LeftBar />
        <MiddleBar />
      </div>
    </div>
  );
};
export default Home;
