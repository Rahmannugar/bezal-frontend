import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { ChangeEvent, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { Popover } from "@mui/material";
import axios from "axios";

const PostBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const mode = useSelector((state: RootState) => state.user.mode);

  //post functionality section
  const [showPicker, setShowPicker] = useState(false);
  const [postMessage, setPostMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);

  // backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  //handle emoji
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setPostMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  //handle tagging users
  const onHashTagClick = () => {
    setPostMessage((prevInput) => prevInput + " @");
  };

  const handlePostMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const message = e.target.value;
    setPostMessage(message);

    // Find the position of '@' and the next space or end of the string
    const atIndex = message.lastIndexOf("@");

    if (atIndex !== -1) {
      const substringFromAt = message.substring(atIndex + 1).trim();
      const searchQueryMatch = substringFromAt.match(/^[^\s]+/);

      if (searchQueryMatch) {
        const searchQuery = searchQueryMatch[0];
        setSearchQuery(searchQuery);
        setSearchAnchorEl(e.currentTarget);
        handleFindUsers();
      }
    } else {
      setSearchAnchorEl(null);
      setSearchQuery("");
    }

    // Check if the message has whitespace after '@'
    const hasWhitespace = /\s/.test(message.substring(atIndex + 1));
    if (hasWhitespace) {
      setSearchQuery("");
      setSearchAnchorEl(null);
    }
  };

  //handle search user menu popup
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleSearchPopoverClose = () => {
    setSearchAnchorEl(null);
  };

  const searchOpen = Boolean(searchAnchorEl);

  //search for users
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleFindUsers = async () => {
    try {
      if (searchQuery == "") {
        return;
      }
      const response = await axios.get(`${backendURL}/users/search`, {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleUserSelect = (userName: string) => {
    const message = postMessage;
    const atIndex = message.lastIndexOf("@");

    if (atIndex !== -1) {
      const newMessage = message.substring(0, atIndex + 1) + userName + " ";
      setPostMessage(newMessage);
      setSearchAnchorEl(null);
      setSearchResults([]);
    }
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

  return (
    <div>
      {/* post bar */}
      <div
        className={`min-w-[600px] w-[50vw] max-w-[100%] py-5 space-y-8 shadow-md px-7 pt-5 mt-10 rounded-[20px] mx-auto ${
          mode ? "bg-white border-none" : "bg-transparent border"
        }`}
      >
        <div className="flex items-center space-x-5">
          <img
            src={user.profileImage}
            alt="bezal"
            className="w-[40px] h-[40px] mt-[-10px] object-cover rounded-full"
          />

          {/* post textfield */}
          <textarea
            className={`min-h-[150px] w-full pt-3 resize-none border-none ${
              mode ? "bg-white text-black" : "bg-transparent text-white"
            }  outline-none  placeholder-[#C5C7C8]`}
            value={postMessage}
            onChange={handlePostMessageChange}
            placeholder="Type Something"
          ></textarea>

          {/* search user popup menu */}
          <Popover
            open={searchOpen}
            anchorEl={searchAnchorEl}
            onClose={handleSearchPopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            disableAutoFocus
            disableEnforceFocus
          >
            <div className="h-[30vh]">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <button className="hover:bg-gray-300">
                    <div
                      key={user._id}
                      className="flex items-center space-x-3 py-3 w-[400px] px-5"
                      onClick={() => handleUserSelect(user.userName)}
                    >
                      <img
                        src={user.profileImage}
                        alt={`${user.userName}'s profile`}
                        className="w-[30px] h-[30px] object-cover rounded-full"
                      />
                      <div>
                        <span>{user.userName}</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-3 w-[400px] px-5">No users found</div>
              )}
            </div>
          </Popover>
        </div>

        {/* Display selected images */}
        <div className="flex space-x-2 mt-4">
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
                <ClearIcon style={{ color: mode ? "#000000" : "#ffffff" }} />
              </div>
            </div>
          ))}
        </div>

        {/* bottom section */}
        <div className="flex justify-between">
          {/* post utilities bar */}
          <div className="flex items-center space-x-5">
            {/* emoji tool */}
            <button>
              <em
                data-emoji=":grin:"
                className="small link"
                onClick={() => setShowPicker((val) => !val)}
              >
                <svg
                  width="20"
                  height="20"
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

            {/* hashtag tool */}
            <button onClick={onHashTagClick}>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  mode ? "fill-[#AAAAAA]" : "fill-white"
                } hover:fill-[#4385F5]`}
              >
                <g clip-path="url(#clip0_1_341)">
                  <path d="M16.25 4.96481H13.9754L14.3578 2.67028C14.4713 1.98903 14.0111 1.34528 13.3304 1.23161C12.6457 1.11931 12.0054 1.57891 11.8918 2.25895L11.4414 4.96481H7.72656L8.10895 2.67028C8.22246 1.98903 7.76227 1.34528 7.0816 1.23161C6.39684 1.11931 5.7566 1.57891 5.64293 2.25895L5.19141 4.96481H2.5C1.80977 4.96481 1.25 5.52458 1.25 6.21481C1.25 6.94138 1.80977 7.46481 2.5 7.46481H4.77461L3.94141 12.4648H1.25C0.559766 12.4648 0 13.0246 0 13.7148C0 14.405 0.559766 14.9297 1.25 14.9297H3.52461L3.14223 17.2242C3.02871 17.9054 3.48891 18.5492 4.16957 18.6629C4.23828 18.7461 4.30859 18.75 4.375 18.75C4.975 18.75 5.50469 18.3168 5.60664 17.7058L6.05742 15H9.77305L9.39066 17.2945C9.27715 17.9757 9.73734 18.6195 10.418 18.7332C10.4883 18.7461 10.5586 18.75 10.625 18.75C11.225 18.75 11.7547 18.3168 11.8566 17.7058L12.3074 15H15C15.6902 15 16.25 14.4402 16.25 13.7851C16.25 13.0949 15.6902 12.5351 15 12.5351H12.7254L13.5586 7.53513H16.25C16.9402 7.53513 17.5 6.97575 17.5 6.32028C17.5 5.55856 16.9414 4.96481 16.25 4.96481ZM10.1914 12.4648H6.47656L7.30859 7.46481H11.0242L10.1914 12.4648Z" />
                </g>
                <defs>
                  <clipPath id="clip0_1_341">
                    <rect width="17.5" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <div className={`${!showPicker ? "hidden" : ""}`}>
              {showPicker && (
                <Picker
                  onEmojiClick={onEmojiClick}
                  reactionsDefaultOpen={true}
                />
              )}
            </div>

            {/* media tool */}
            <button onClick={handleMediaButtonClick}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  mode ? "fill-[#AAAAAA]" : "fill-white"
                } hover:fill-[#4385F5] mt-[7px]`}
              >
                <g clip-path="url(#clip0_1_343)" filter="url(#filter0_d_1_343)">
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
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
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

            {/* visibility tool */}
            <button
              className={`flex justify-center items-center space-x-2 rounded-[10px]  w-[140px] h-[40px] ${
                mode
                  ? "bg-[#f7f6f6] text-[#585858] border-none"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  mode ? "fill-[#AAAAAA]" : "fill-white"
                } hover:fill-[#4385F5]`}
              >
                <g clip-path="url(#clip0_1_348)">
                  <path d="M2.74805 3.85742C2.61035 3.88965 2.69824 3.88379 2.58398 3.89844C2.09473 4.00391 2.45801 4.09766 2.74805 3.85742ZM11.3525 4.05371C11.3877 4.03027 11.5107 3.91016 11.127 3.79297C11.1504 3.91309 11.0479 3.90137 11.0479 3.96875C11.332 4.22656 11.4492 4.6748 11.8125 4.76855C11.8828 4.44629 11.4902 4.28809 11.3525 4.05371ZM2.4873 3.76367C2.53125 4.02441 2.72754 3.48828 2.73047 3.29785C2.6543 3.3418 2.57812 3.38574 2.49902 3.4209C2.68359 3.51465 2.52246 3.61426 2.32324 3.76367C1.91895 4.26758 2.70117 3.37109 2.4873 3.76367ZM7.5 0.5C3.35742 0.5 0 3.85742 0 8C0 12.1396 3.35742 15.5 7.5 15.5C11.6426 15.5 15 12.1396 15 8C15 3.85742 11.6426 0.5 7.5 0.5ZM7.69922 3.01367L7.73438 3.02539C7.59375 3.20703 8.4668 3.7373 7.83984 3.78125C7.25391 3.94824 8.08594 3.62891 7.63184 3.68457C7.87207 3.35059 7.44141 3.34473 7.69922 3.01367ZM4.14258 3.49414C3.93164 3.31836 3.26953 3.73438 3.50098 3.63477C4.0752 3.40918 3.53906 3.6582 3.67383 3.92773C3.55078 4.18262 3.63281 3.67578 3.32812 3.97754C3.1084 4.02734 2.56934 4.52539 2.63672 4.37305C2.61914 4.61035 1.99512 4.8916 1.91016 5.28711C1.70508 5.83496 1.86035 5.2666 1.82227 5.05273C1.5293 4.68066 0.996094 5.68262 1.1543 6.07812C1.4209 5.60938 1.40039 6.02832 1.20703 6.23633C1.40332 6.59668 1.02832 7.06543 1.40039 7.33203C1.56445 7.37012 1.89258 6.78125 1.74902 7.39356C1.84863 6.86328 2.02441 7.51953 2.30859 7.37305C2.32617 7.65137 2.49902 7.52246 2.53711 7.85937C3.01172 7.82422 3.44531 8.62695 2.87988 8.7793C2.96484 8.75586 3.13184 8.90527 3.3252 8.79102C3.65332 9.05176 4.51758 9.08398 4.54102 9.72852C3.94629 10.0127 4.39453 10.792 3.87891 11.0703C3.28711 10.9824 3.67676 11.7998 3.42773 11.7061C3.52734 12.2949 2.83008 11.6299 3.09961 11.9551C3.59473 12.2598 2.88281 12.1982 3.10547 12.4209C2.85645 12.3682 3.26074 12.8838 3.32812 13.0742C3.68555 13.6543 3.02051 12.9453 2.82422 12.752C2.63672 12.377 2.19434 11.6592 2.07129 11.0703C2.00098 10.2148 1.33887 9.64062 1.18652 8.80566C1.03418 8.33984 1.60547 7.59277 1.29785 7.33203C1.03125 7.12402 1.13965 6.41211 0.981445 6.03711C1.37695 4.32324 2.63379 2.87891 4.14258 2.02344C3.9873 2.1377 5.03027 1.72754 4.91016 1.82715C4.87793 1.90039 5.51953 1.54883 5.90625 1.49609C5.86523 1.50195 4.90137 1.84766 5.16797 1.80078C4.75488 2.00293 5.12695 1.88867 5.33203 1.78613C4.92188 2.08789 4.60547 2.00293 4.13965 2.26953C3.6709 2.39258 3.76758 2.87891 3.43359 3.12207C3.62988 3.15723 4.12207 2.61523 4.40918 2.4248C5.06836 2.10547 4.0752 3.00488 4.70215 2.61816C4.49121 2.81445 4.53516 3.12793 4.40625 3.21582C4.3418 3.19824 4.66113 3.36816 4.14258 3.49414ZM5.16797 2.14648C5.10059 2.2373 5.00684 2.43359 4.95117 2.31348C4.875 2.35156 4.8457 2.51562 4.70215 2.38379C4.78711 2.32227 4.875 2.17578 4.70801 2.2666C4.78418 2.18457 5.46387 1.95312 5.42578 1.86523C5.5459 1.78906 5.53418 1.75098 5.39648 1.79785C5.32617 1.77441 5.56348 1.5752 5.87988 1.54883C5.92383 1.54883 5.94141 1.57812 5.8623 1.56934C5.38477 1.71582 5.58984 1.6748 5.91211 1.56934C5.78906 1.63965 5.7041 1.66016 5.68359 1.69238C6.00586 1.5752 5.66602 1.77734 5.73926 1.7627C5.64844 1.80957 5.75391 1.82422 5.57812 1.8916C5.61035 1.86523 5.29102 2.08203 5.48145 2.01758C5.29688 2.19336 5.21484 2.19629 5.16797 2.14648ZM5.44922 2.56543C5.45508 2.28418 5.85938 2.10547 5.80957 2.09082C6.30762 1.85645 5.63672 2.09961 6.0293 1.88867C6.17578 1.87402 6.48633 1.40527 6.91699 1.37598C7.3916 1.23242 7.17187 1.38477 7.52344 1.25L7.45312 1.30859C7.3916 1.31738 7.46777 1.42578 7.24512 1.58984C7.22168 1.84473 6.82031 1.72754 7.01953 2C6.89062 1.81543 6.69727 1.99414 6.94043 2.01172C6.67969 2.21094 6.07324 2.24609 5.7832 2.57715C5.5957 2.84668 5.42285 2.76172 5.44922 2.56543ZM7.53223 3.50293C7.33301 3.9834 7.13965 3.43262 7.49121 3.34473C7.5791 3.3916 7.61426 3.40625 7.53223 3.50293ZM6.78223 2.54199C6.72363 2.3252 6.77051 2.43945 7.11914 2.33691C7.35938 2.50977 6.90527 2.62402 6.78223 2.54199ZM12.2373 11.1406C11.9619 10.666 12.5713 10.2266 12.7764 9.82812C12.75 10.2939 12.6914 10.7539 12.2373 11.1406ZM13.2744 5.71777C12.9756 5.74121 12.7061 5.81152 12.4365 5.6416C11.8154 4.96191 12.5508 6.40918 12.7559 5.81738C13.4941 6.09863 12.7441 7.31152 12.2783 7.18555C12.0176 6.62305 11.6953 6.00488 11.127 5.72949C11.5635 6.21289 11.7803 6.80762 12.249 7.24414C12.2813 7.85352 12.8994 7.02148 12.8613 7.49316C12.9199 8.30469 11.9443 8.79102 12.1143 9.60547C12.4775 10.3467 11.4141 10.4814 11.5342 11.1465C11.1064 11.624 10.6494 12.2686 9.88184 12.166C9.88184 11.7617 9.67676 11.4189 9.62988 11.0029C9.21387 10.4756 10.0693 9.91016 9.53906 9.35938C8.92676 9.22168 9.66504 8.37793 9.03516 8.45703C8.65723 8.0791 8.10352 8.44531 7.56152 8.44824C6.88184 8.5127 6.18164 7.61328 6.4834 6.97754C6.24316 6.31543 7.24512 6.12207 7.27148 5.53906C7.75195 5.1377 8.43457 5.1875 9.08496 5.09375C9.03809 5.55957 9.53027 5.5625 9.90234 5.71777C10.1104 5.21387 10.7578 5.7998 11.2002 5.48047C11.3525 4.73633 10.7695 5.18457 10.4355 4.94727C10.0312 4.35547 11.2998 4.64258 11.168 4.33203C10.6758 4.3291 10.9541 3.72559 10.6055 4.0625C10.9189 4.11816 10.5498 4.36426 10.5586 4.08301C10.084 3.94531 10.541 4.62207 10.3008 4.68652C9.93457 4.53418 10.1074 4.85938 10.1455 4.90918C9.9873 5.25195 9.79395 4.40527 9.3457 4.42871C8.90039 4.02148 9.16992 4.61328 9.55664 4.70996C9.47461 4.7334 9.60352 5.07031 9.50098 4.92676C9.18164 4.4873 8.5752 4.19434 8.21484 4.7334C8.17676 5.2373 7.15137 5.38086 7.31543 4.79199C7.07519 4.18262 8.05957 4.77441 7.96875 4.28809C7.33594 3.86914 8.1416 4.00391 8.35547 3.61133C8.8418 3.62598 8.37598 3.21289 8.60449 3.09277C8.58105 3.54102 8.97656 3.45605 9.29004 3.37109C9.21387 3.11328 9.47754 3.12207 9.31641 2.9082C10.043 2.61816 8.7627 3.04297 9.02051 2.40723C8.70703 2.19043 8.88867 2.88477 9.02051 2.95801C9.0293 3.17188 8.84766 3.43555 8.59863 2.9873C8.23535 3.22461 8.27344 2.74707 8.25 2.79688C8.20898 2.6123 8.52539 2.60352 8.52832 2.28125C8.50195 2.07617 8.50781 1.96777 8.6543 1.95605C8.66602 1.98535 9.25488 1.99414 9.46289 2.2373C8.89453 2.12305 9.37793 2.33105 9.63281 2.44824C9.36035 2.23438 9.74121 2.44824 9.51855 2.20508C9.60644 2.22266 9.27539 1.87109 9.61523 2.17871C9.43066 1.95898 9.97559 2.02344 9.65332 1.85938C10.125 1.99121 9.84668 1.87109 9.56836 1.75098C8.80078 1.29395 10.9248 2.36914 10.0576 1.8916C10.6113 2.01172 8.87402 1.46387 9.66504 1.7041C9.36328 1.57227 9.65625 1.64551 9.92871 1.73047C9.43945 1.57812 8.70703 1.29395 8.73633 1.28223C8.90625 1.29395 9.07324 1.33203 9.23438 1.37891C9.73535 1.52832 9.09082 1.34375 9.22852 1.34668C10.9512 1.78906 12.46 2.94336 13.377 4.45215C13.5908 4.67773 14.1738 6.16895 13.8691 5.50684C14.0068 6.03418 14.0273 6.60254 14.1006 7.1416C13.9482 6.97168 13.7783 6.34473 13.6318 5.99609C13.5703 6.13086 13.5 5.80566 13.2744 5.71777Z" />
                </g>
                <defs>
                  <clipPath id="clip0_1_348">
                    <rect
                      width="15"
                      height="15"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {/* drop down menu */}
              <div className="flex justify-center items-center space-x-3">
                <h1>Everyone</h1>
                <svg
                  width="14"
                  height="7"
                  viewBox="0 0 14 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L7.28571 6L13 1" stroke="#585858" />
                </svg>
              </div>
            </button>
          </div>

          {/* post button */}
          <button className="w-[100px] h-[40px] rounded-[10px] text-white bg-[#4385F5] hover:bg-[#AAAAAA] duration-100">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostBar;
