import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();

  // Backend URL from environment
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backendURL}/posts/post/${postId}`);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, []);
  return <div>SinglePost</div>;
};
export default SinglePost;
