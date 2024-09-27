import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import { storage } from "../storage/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Picker, { EmojiClickData } from "emoji-picker-react";
import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Chat from "./Chat";
import { useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { setConversation } from "../states/userSlice";
import { debounce } from "lodash";
import { io } from "socket.io-client";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  dateOfBirth: string;
  isDatePublic: boolean;
  location: string;
  userPosts: string[];
  userFollowers: string[];
  userFollows: string[];
}

export interface Conversation {
  [x: string]: any;
  _id: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Messages {
  conversationId: string;
  senderId: string;
  text: string;
  images: string[];
}

interface CurrentConversation {
  otherMember: User;
  conversation: Conversation;
}

type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  images: string[];
};

const ChatPage = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();
  const [currentConversation, setCurrentConversation] =
    useState<CurrentConversation | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);

  const [conversations, setConversations] = useState<
    (Conversation | undefined)[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/conversations/${user._id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const updatedConversations = response.data
            .map((conversation: Conversation) => {
              const otherMember = conversation.members.find(
                (member) => member._id !== user._id
              );
              return { otherMember, conversation };
            })
            .sort(
              (
                a: { conversation: { updatedAt: string | number | Date } },
                b: { conversation: { updatedAt: string | number | Date } }
              ) => {
                // Sorting conversations by updatedAt in descending order
                return (
                  new Date(b.conversation.updatedAt).getTime() -
                  new Date(a.conversation.updatedAt).getTime()
                );
              }
            );

          setConversations(updatedConversations);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, [backendURL, user._id, messages]);

  const filteredConversations = conversations.filter((conversation) => {
    const otherMember = conversation?.otherMember;
    if (!otherMember) return false;

    const userName = otherMember.userName?.toLowerCase() || "";

    return userName.includes(searchQuery.toLowerCase());
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentConversation) {
      const getConversation = async () => {
        const newConversation = user?.conversation;

        if (newConversation) {
          const otherMember = newConversation.members.find(
            (member: User) => member._id !== user._id
          );
          if (otherMember) {
            // Check if otherMember is found
            setCurrentConversation({
              otherMember,
              conversation: newConversation,
            });

            setTimeout(() => {
              dispatch(setConversation(null));
            }, 5000);

            setConversations((prevConversations) => {
              const existingConversationIndex = prevConversations.findIndex(
                (conv) => conv?._id === newConversation._id
              );
              if (existingConversationIndex !== -1) {
                const updatedConversations = [...prevConversations];
                updatedConversations.splice(existingConversationIndex, 1);
                return [newConversation, ...updatedConversations];
              }
              return [newConversation, ...prevConversations];
            });
          } else {
            console.error("No other member found in the conversation");
          }
        } else {
          console.error("No conversation found for the user");
        }
      };
      getConversation();
    }
  }, [currentConversation]);

  useEffect(() => {
    if (currentConversation) {
      const getMessages = async () => {
        try {
          const response = await axios.get(
            `${backendURL}/messages/${currentConversation.conversation._id}`,
            {
              withCredentials: true,
            }
          );
          setMessages(response.data);
        } catch (err) {
          console.error(err);
          setError("Couldn't fetch messages.");
        }
      };
      getMessages();
    }
  }, [backendURL, currentConversation]);

  const [images, setImages] = useState<File[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  //handle emoji
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  //select image
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (imageIndex: number) => {
    const newImages = images.filter((_, index) => index !== imageIndex);
    setImages(newImages);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 4); // Allow up to 4 images
      setImages(selectedFiles);
    }
  };

  const uploadImageAndGetUrl = async (file: File) => {
    const storageRef = ref(storage, `messages/${user._id}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSendMessage = async () => {
    try {
      const conversationId = currentConversation?.conversation._id;

      const uploadedImageUrls = await Promise.all(
        images.map((image) => uploadImageAndGetUrl(image))
      );

      const messageData = {
        conversationId,
        senderId: user._id,
        text: newMessage,
        images: uploadedImageUrls || [],
      };

      const response = await axios.post(`${backendURL}/messages`, messageData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessages([...messages]);
        setNewMessage("");
        setImages([]);

        setConversations((prevConversations) => {
          const existingConversationIndex = prevConversations.findIndex(
            (conv) => conv?._id === currentConversation?.conversation._id
          );

          if (existingConversationIndex !== -1) {
            // If the conversation exists, remove it from its current position
            const updatedConversations = [...prevConversations];
            updatedConversations.splice(existingConversationIndex, 1);
            return [currentConversation?.conversation, ...updatedConversations]; // Prepend the updated conversation
          }

          // If it doesn't exist, prepend it
          return [currentConversation?.conversation, ...prevConversations];
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message.");
    }
  };

  const scrollRef = useRef();

  //real time messageas
  const socket = io(backendURL, {
    withCredentials: true,
  });

  const [realTimeMessages, setRealTimMessages] = useState<Message[]>([]);

  const debouncedMessageHandler = debounce((data: Message) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  }, 200);

  useEffect(() => {
    // Listen for real-time notifications
    socket.on("newMessage", (data) => {
      debouncedMessageHandler(data);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [backendURL, socket]);

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
      <div className="flex justify-between items-center px-5 lg:px-10">
        {/* left slider */}
        <div
          className={`${
            mode ? "bg-white" : "bg-transparent border"
          }   rounded-[20px] h-screen px-5 shadow-md w-screen mt-10  ${
            visible ? "hidden" : ""
          } lg:mt-0 lg:w-1/3 lg:block`}
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

          <div className="flex justify-start items-center space-x-1 w-full h-[40px] px-3 py-3 border-[2px] border-gray-300 rounded-[10px] bg-white">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full outline-none border-none bg-transparent focus:ring-0"
            />
          </div>

          {filteredConversations.map((conversation) => (
            <Conversation
              setVisible={setVisible}
              key={conversation?._id}
              setCurrentConversation={setCurrentConversation}
              conversation={conversation}
              currentConversation={currentConversation}
            />
          ))}
        </div>

        {/* main chat */}
        <div
          className={`${
            mode ? "bg-white" : "bg-transparent border"
          }   rounded-[20px] flex-col h-screen shadow-md mt-10 lg:mt-0 lg:w-3/5 py-5 ${
            visible ? "flex w-[100%]" : "hidden"
          } lg:flex`}
        >
          {error ? (
            <p
              className={`flex justify-center items-center h-screen ${
                mode ? "text-black" : "text-white"
              }`}
            >
              {error}
            </p>
          ) : currentConversation ? (
            <div
              className="flex-grow overflow-y-auto h- w-full relative"
              id="chat-container"
            >
              <Chat
                setVisible={setVisible}
                currentConversation={currentConversation}
                messages={messages}
                scrollRef={scrollRef}
              />
              <div className="bottom-3 px-5 ">
                <div className="flex flex-shrink-0 relative">
                  <textarea
                    onChange={handleMessageChange}
                    className={`min-h-[40px] relative w-screen place-content-center rounded-md resize-none border-none  ${
                      mode ? "bg-gray-400 text-black" : " text-black"
                    } outline placeholder-[#C5C7C8] `}
                    placeholder="Write a message"
                    value={newMessage}
                  ></textarea>
                  <div className="flex items-center pl-1 space-x-2">
                    {/* emoji tool */}
                    <button>
                      <em
                        data-emoji=":grin:"
                        className="small link"
                        onClick={() => setShowPicker((val) => !val)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${
                            mode ? "fill-[#AAAAAA]" : "fill-white"
                          } hover:fill-[#4385F5]`}
                        >
                          <path
                            d="M1.42859 10C1.42859 5.26645 5.26645 1.42859 10 1.42859C14.7336 1.42859 18.5714 5.26645 18.5714 10C18.5714 14.7336 14.7336 18.5714 10 18.5714C5.26645 18.5714 1.42859 14.7336 1.42859 10ZM12.5 9.28573C12.7842 9.28573 13.0567 9.17285 13.2576 8.97192C13.4586 8.77099 13.5714 8.49846 13.5714 8.2143C13.5714 7.93014 13.4586 7.65762 13.2576 7.45669C13.0567 7.25576 12.7842 7.14288 12.5 7.14288C12.2159 7.14288 11.9433 7.25576 11.7424 7.45669C11.5415 7.65762 11.4286 7.93014 11.4286 8.2143C11.4286 8.49846 11.5415 8.77099 11.7424 8.97192C11.9433 9.17285 12.2159 9.28573 12.5 9.28573ZM8.57145 8.2143C8.57145 7.93014 8.45856 7.65762 8.25763 7.45669C8.0567 7.25576 7.78418 7.14288 7.50002 7.14288C7.21586 7.14288 6.94334 7.25576 6.7424 7.45669C6.54147 7.65762 6.42859 7.93014 6.42859 8.2143C6.42859 8.49846 6.54147 8.77099 6.7424 8.97192C6.94334 9.17285 7.21586 9.28573 7.50002 9.28573C7.78418 9.28573 8.0567 9.17285 8.25763 8.97192C8.45856 8.77099 8.57145 8.49846 8.57145 8.2143ZM5.94859 12.2357C5.83114 12.3157 5.75025 12.439 5.72373 12.5786C5.69721 12.7182 5.72722 12.8626 5.80716 12.98V12.9807L5.80859 12.9822L5.81002 12.9843L5.81573 12.9914C5.83799 13.0232 5.8611 13.0545 5.88502 13.085C5.93145 13.1443 5.99788 13.225 6.08502 13.32C6.31978 13.5745 6.57994 13.8042 6.86145 14.0057C7.5543 14.505 8.59859 15 10 15C11.4014 15 12.4464 14.5043 13.1386 14.0064C13.4203 13.8044 13.6807 13.5742 13.9157 13.3193C14.0054 13.2217 14.09 13.1197 14.1693 13.0136L14.185 12.9922L14.19 12.985L14.1914 12.9822L14.1922 12.9807L14.1929 12.98C14.273 12.8627 14.3032 12.7183 14.2769 12.5786C14.2506 12.439 14.1699 12.3155 14.0525 12.2354C13.9352 12.1552 13.7908 12.125 13.6511 12.1513C13.5115 12.1777 13.388 12.2584 13.3079 12.3757L13.3029 12.3829C13.2475 12.4563 13.1886 12.5271 13.1264 12.595C12.9408 12.7958 12.7352 12.9772 12.5129 13.1364C11.9643 13.5314 11.1343 13.9286 10 13.9286C8.86645 13.9286 8.03573 13.5314 7.48716 13.1364C7.26507 12.9775 7.05973 12.7963 6.8743 12.5957C6.81216 12.5279 6.75329 12.4571 6.69788 12.3836L6.69145 12.375C6.61119 12.2583 6.48798 12.1781 6.34877 12.152C6.20956 12.1259 6.06567 12.156 5.94859 12.2357Z"
                            fill=""
                          />
                        </svg>
                      </em>
                    </button>

                    <div
                      ref={pickerRef}
                      className={`${
                        !showPicker ? "hidden" : ""
                      } flex justify-start items-start`}
                    >
                      {showPicker && (
                        <Picker
                          onEmojiClick={onEmojiClick}
                          reactionsDefaultOpen={true}
                        />
                      )}
                    </div>

                    {/* media button */}
                    <button onClick={handleMediaButtonClick}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          mode ? "fill-[#AAAAAA]" : "fill-white"
                        } hover:fill-[#4385F5] mt-[7px]`}
                      >
                        <g
                          clip-path="url(#clip0_1_343)"
                          filter="url(#filter0_d_1_343)"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.1725 6.95497C19.477 6.95538 19.7745 7.07249 20.0275 7.29149C20.2805 7.51049 20.4776 7.82154 20.5939 8.18534C20.7102 8.54914 20.7404 8.94934 20.6808 9.33537C20.6212 9.7214 20.4745 10.0759 20.2591 10.3541C20.0437 10.6323 19.7693 10.8217 19.4707 10.8983C19.1721 10.975 18.8626 10.9354 18.5813 10.7847C18.3001 10.634 18.0597 10.3788 17.8906 10.0515C17.7215 9.72416 17.6312 9.33935 17.6312 8.94571C17.631 8.68402 17.6707 8.42486 17.7481 8.18307C17.8255 7.94128 17.9391 7.72162 18.0823 7.53668C18.2255 7.35174 18.3955 7.20516 18.5826 7.10533C18.7697 7.00551 18.9701 6.95441 19.1725 6.95497ZM20.3916 2.27904V1.64773H5.27931V15.6397H6.00034V17.2938H5.12143C4.82504 17.2946 4.54052 17.1432 4.33041 16.8729C4.22666 16.7391 4.14446 16.5799 4.08859 16.4047C4.03271 16.2296 4.00427 16.0418 4.00489 15.8523V1.44992C4.00532 1.06663 4.12293 0.699117 4.33209 0.427505C4.54125 0.155894 4.82499 0.00222153 5.12143 0L20.5495 0C20.8468 0.000556656 21.1318 0.153494 21.342 0.425285C21.5522 0.697077 21.6705 1.06555 21.6709 1.44992V2.27904H20.3916ZM21.8825 18.3481L19.2132 12.8367C19.1582 12.7232 19.0817 12.6297 18.991 12.5648C18.9004 12.5 18.7985 12.466 18.6948 12.466C18.5912 12.466 18.4893 12.5 18.3986 12.5648C18.308 12.6297 18.2315 12.7232 18.1764 12.8367L16.9167 15.4609L18.2871 18.3481H17.724L13.9805 10.6292C13.9164 10.4975 13.8276 10.3889 13.7223 10.3137C13.617 10.2384 13.4986 10.1989 13.3783 10.1989C13.2579 10.1989 13.1396 10.2384 13.0342 10.3137C12.9289 10.3889 12.8401 10.4975 12.7761 10.6292L9.12208 18.3481H8.60939V5.64604H22.7175V18.3481H21.8825ZM22.8802 19.9916H8.45151C8.15463 19.9905 7.87014 19.8377 7.66007 19.5664C7.44999 19.2952 7.33138 18.9276 7.33009 18.5438V5.44192C7.33223 5.05882 7.45122 4.69228 7.66121 4.42197C7.87119 4.15166 8.15519 3.99942 8.45151 3.99832H22.8802C23.1769 3.99943 23.4613 4.15232 23.6711 4.4236C23.8809 4.69487 23.9992 5.06249 24 5.44613V18.5564C23.9962 18.9377 23.8767 19.3017 23.6672 19.5702C23.4578 19.8386 23.1751 19.99 22.8802 19.9916Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_1_343"
                            x="0"
                            y="0"
                            width="28"
                            height="28"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_1_343"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_1_343"
                              result="shape"
                            />
                          </filter>
                          <clipPath id="clip0_1_343">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(4)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </button>

                    {/* Display selected images */}
                    <div className="flex left-0 bottom-20 absolute space-x-1 mt-4">
                      {images.map((image, index) => (
                        <div className="relative">
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`preview-${index}`}
                            className="w-[50px] h-[50px] object-cover"
                          />
                          <div
                            className="absolute top-0 right-0"
                            onClick={() => removeImage(index)}
                          >
                            <ClearIcon
                              style={{ color: mode ? "#000000" : "#ffffff" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* submit comment button */}
                    <button
                      onClick={handleSendMessage}
                      className={` ${mode ? "text-[#AAAAAA]" : "text-white"}`}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p
              className={`flex justify-center items-center h-screen ${
                mode ? "text-black" : "text-white"
              }`}
            >
              Select a conversation to start chatting
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
