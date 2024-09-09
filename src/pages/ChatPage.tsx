import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();
  const selectedUser = useParams();

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
          }   rounded-[20px] h-screen px-5 shadow-md w-1/3`}
        >
          <div className="flex justify-between items-center py-5">
            <h1 className={`${mode ? "text-black" : "text-white"} text-xl`}>
              MY CHATS
            </h1>
            <a href={`/${user?.userName}/friends`}>
              <button className="bg-[#4385F5] text-white px-3 py-3 rounded-xl">
                New chat
              </button>
            </a>
          </div>
          {/* search field */}
          <div className="flex justify-start items-center space-x-1 w-full h-[40px] px-3 py-3 border-[2px] border-gray-300 rounded-[10px] bg-white">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none border-none bg-transparent focus:ring-0"
            />
          </div>
          <div className="flex space-x-3 mt-5">
            <img
              src={selectedUser.profileImage}
              alt={`${selectedUser.firstName}'s profile`}
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <h1 className={`${mode ? "text-black" : "text-white"} `}>
              {selectedUser.username}
            </h1>
          </div>
        </div>
        {/* main chat */}
        <div
          className={`${
            mode ? "bg-white" : "bg-transparent border"
          }   rounded-[20px] h-screen shadow-md w-3/5`}
        >
          {selectedUser ? (
            <Chat />
          ) : (
            <div className="flex justify-center py-10">
              <h1 className={`${mode ? "text-black" : "text-white"}  text-xl`}>
                Click on a user to start a conversation
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
