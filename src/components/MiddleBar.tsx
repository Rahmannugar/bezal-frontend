import HomeFeedBar from "./HomeFeedBar";
import PostBar from "./PostBar";

const MiddleBar = () => {
  return (
    <div className="mx-auto">
      <PostBar />
      <HomeFeedBar />
    </div>
  );
};
export default MiddleBar;
