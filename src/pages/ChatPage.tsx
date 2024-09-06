import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();

  //search for users
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleFindUsers();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleFindUsers = async () => {
    try {
      const response = await axios.get(`${backendURL}/users/search`, {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

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
      <div className="flex justify-between items-center px-10">
        {/* left slider */}
        <div
          className={`${
            mode ? "bg-white" : "bg-transparent border"
          }   rounded-[20px] h-screen shadow-md w-1/3`}
        >
          <div className="flex justify-between items-center px-5 py-5">
            <h1 className={`${mode ? "text-black" : "text-white"} text-xl`}>
              MY CHATS
            </h1>
            <a href={`/${user?.userName}/friends`}>
              <button className="bg-[#4385F5] text-white px-3 py-3 rounded-xl">
                New chat
              </button>
            </a>
          </div>
          <h1></h1>
        </div>
        {/* main chat */}
        <div
          className={`${
            mode ? "bg-white" : "bg-transparent border"
          }   rounded-[20px] h-screen shadow-md w-3/5`}
        ></div>
      </div>
    </div>
  );
};
export default ChatPage;
