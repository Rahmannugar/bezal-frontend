import { useSelector } from "react-redux";
import { RootState } from "../states/store";

const UnLeftBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const trimmedUserName =
    user.userName.trim().length > 6
      ? user.userName.trim().slice(0, 6) + "..."
      : user.userName.trim();

  const mode = useSelector((state: RootState) => state.user.mode);

  return (
    <div className="px-5 hidden md:block pt-10">
      {/* top left side bar */}
      <div
        className={`min-w-[238px] ${
          mode ? "bg-whit" : "bg-transparent border"
        } w-[20vw] max-w-[100%] h-auto py-8 shadow-md rounded-[20px] flex flex-col space-y-5`}
      >
        {/* individual icons */}

        {/* home */}
        <a href="/" className="flex group items-center px-10 space-x-5">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <g clip-path="url(#clip0_1_354)">
                <path
                  d="M19.6488 7.86157L17.1463 5.82204V2.56025C17.1463 2.19294 16.8474 1.89407 16.4801 1.89407H14.9055C14.5382 1.89407 14.2393 2.19294 14.2393 2.56025V3.45274L10.8955 0.72753C10.6537 0.530462 10.3349 0.421875 9.99789 0.421875C9.66226 0.421875 9.34497 0.529796 9.10442 0.725834L0.351262 7.86151C-0.046447 8.18558 -0.0225857 8.46785 0.0270144 8.60727C0.0764932 8.74638 0.235831 8.97978 0.746729 8.97978H1.94531V18.3636C1.94531 19.0333 2.48867 19.5781 3.15654 19.5781H6.94164C7.60389 19.5781 8.1226 19.0446 8.1226 18.3636V14.5155C8.1226 14.1857 8.42571 13.8853 8.7585 13.8853H11.3021C11.6193 13.8853 11.8774 14.168 11.8774 14.5155V18.3636C11.8774 19.0219 12.446 19.5781 13.1189 19.5781H16.8435C17.5114 19.5781 18.0547 19.0333 18.0547 18.3636V8.97978H19.2533C19.7642 8.97978 19.9235 8.74638 19.973 8.60727C20.0226 8.46785 20.0465 8.18558 19.6488 7.86157Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_1_354">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Home
          </h1>
        </a>

        {/* Chat */}
        <a href="/chat" className="flex items-center px-10 space-x-5 group">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <g clip-path="url(#clip0_1_358)">
                <path
                  d="M19.1326 17.2236C18.559 16.9973 18.0576 16.6081 17.6959 16.1015C19.1124 15.1443 20.0001 13.7723 20.0001 12.2479C20.0001 10.5798 18.9373 9.09385 17.2816 8.13477C17.1066 12.1761 12.8177 15.0539 7.99168 15.0539C7.58551 15.0539 7.18299 15.033 6.78494 14.9936C8.04168 16.4887 10.2937 17.4853 12.8632 17.4853C13.8004 17.4853 14.6953 17.3525 15.5152 17.1115C16.2488 17.798 17.2924 18.131 18.3516 17.9139C18.636 17.8556 18.9039 17.7613 19.1514 17.6366C19.2311 17.5965 19.2799 17.5133 19.2758 17.4241C19.2717 17.3348 19.2156 17.2564 19.1326 17.2236Z"
                  fill=""
                />
                <path
                  d="M15.9831 7.88495C15.9831 4.64604 12.4052 2.02039 7.99157 2.02039C3.57796 2.02039 0 4.64604 0 7.88495C0 9.59177 0.993913 11.1281 2.57987 12.1998C2.16378 12.7826 1.58261 13.2266 0.918435 13.4769C0.835 13.5083 0.777739 13.5857 0.772174 13.6747C0.766609 13.7637 0.813826 13.8477 0.892739 13.8892C1.40926 14.1612 1.98974 14.3031 2.56978 14.3031C3.49617 14.3031 4.36878 13.9422 5.022 13.3309C5.94009 13.6008 6.94213 13.7495 7.99161 13.7495C12.4052 13.7495 15.9831 11.1239 15.9831 7.88495Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_1_358">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Chat
          </h1>
        </a>

        {/* Friends */}
        <a
          href={`${user.userName}/friends`}
          className="flex items-center px-10 space-x-5 group"
        >
          <div>
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <path
                d="M6 8C7.93437 8 9.5 6.43437 9.5 4.5C9.5 2.56562 7.93437 1 6 1C4.06563 1 2.5 2.56562 2.5 4.5C2.5 6.43437 4.06563 8 6 8ZM8.4 9H8.14062C7.49062 9.3125 6.76875 9.5 6 9.5C5.23125 9.5 4.5125 9.3125 3.85938 9H3.6C1.6125 9 0 10.6125 0 12.6V13.5C0 14.3281 0.671875 15 1.5 15H10.5C11.3281 15 12 14.3281 12 13.5V12.6C12 10.6125 10.3875 9 8.4 9ZM15 8C16.6562 8 18 6.65625 18 5C18 3.34375 16.6562 2 15 2C13.3438 2 12 3.34375 12 5C12 6.65625 13.3438 8 15 8ZM16.5 9H16.3813C15.9469 9.15 15.4875 9.25 15 9.25C14.5125 9.25 14.0531 9.15 13.6187 9H13.5C12.8625 9 12.275 9.18437 11.7594 9.48125C12.5219 10.3031 13 11.3938 13 12.6V13.8C13 13.8688 12.9844 13.9344 12.9812 14H18.5C19.3281 14 20 13.3281 20 12.5C20 10.5656 18.4344 9 16.5 9Z"
                fill=""
              />
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Friends
          </h1>
        </a>

        {/* Settings */}
        <a
          href={`/${user.userName}`}
          className="flex items-center px-10 space-x-5  group"
        >
          <div className="hover:text-[#4385F5]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <path
                d="M10 11.25C10.6904 11.25 11.25 10.6904 11.25 10C11.25 9.30964 10.6904 8.75 10 8.75C9.30964 8.75 8.75 9.30964 8.75 10C8.75 10.6904 9.30964 11.25 10 11.25Z"
                fill=""
              />
              <path
                d="M18.2417 8.59996L17.5833 6.49996C17.5123 6.25726 17.393 6.03135 17.2327 5.83573C17.0725 5.6401 16.8744 5.47876 16.6504 5.36133C16.4265 5.24389 16.1811 5.17277 15.9291 5.15221C15.677 5.13164 15.4234 5.16205 15.1833 5.24163L14.9 5.33329C14.678 5.40666 14.4416 5.42528 14.2109 5.38755C13.9802 5.34983 13.762 5.25688 13.575 5.11663L13.4833 5.04996C13.3008 4.91027 13.1537 4.72965 13.0538 4.52265C12.9539 4.31566 12.9041 4.08809 12.9083 3.85829V3.62496C12.9124 3.10165 12.7086 2.59812 12.3417 2.22496C12.1671 2.04867 11.9595 1.90859 11.7307 1.81278C11.5019 1.71696 11.2564 1.66729 11.0083 1.66663H8.88333C8.37348 1.67321 7.88687 1.88095 7.52946 2.24461C7.17204 2.60827 6.97276 3.0984 6.975 3.60829V3.80829C6.9742 4.05019 6.91913 4.28882 6.81384 4.5066C6.70856 4.72438 6.55574 4.91575 6.36667 5.06663L6.25833 5.14996C6.04945 5.30798 5.80514 5.41259 5.54663 5.45471C5.28812 5.49682 5.02324 5.47517 4.775 5.39163C4.54701 5.31273 4.30539 5.28091 4.06475 5.2981C3.82411 5.31529 3.58946 5.38113 3.375 5.49163C3.15171 5.60245 2.95362 5.75804 2.79305 5.94871C2.63248 6.13939 2.51287 6.36107 2.44167 6.59996L1.75833 8.76663C1.59987 9.25512 1.64051 9.78641 1.87142 10.2451C2.10234 10.7038 2.50489 11.0529 2.99167 11.2166H3.125C3.34955 11.3008 3.55109 11.4367 3.71326 11.6133C3.87542 11.79 3.99365 12.0024 4.05833 12.2333L4.10833 12.3666C4.20123 12.6217 4.23229 12.8952 4.19898 13.1647C4.16566 13.4341 4.06891 13.6918 3.91667 13.9166C3.60851 14.3363 3.47853 14.8606 3.555 15.3756C3.63147 15.8906 3.9082 16.3546 4.325 16.6666L6.05 17.975C6.37663 18.2124 6.77119 18.3381 7.175 18.3333C7.28307 18.3439 7.39192 18.3439 7.5 18.3333C7.75008 18.2849 7.98768 18.186 8.1983 18.0428C8.40891 17.8995 8.58813 17.7148 8.725 17.5L8.91667 17.225C9.05112 17.0321 9.22902 16.8735 9.43601 16.7621C9.64301 16.6506 9.87331 16.5894 10.1083 16.5833C10.3546 16.5772 10.5984 16.6337 10.817 16.7473C11.0356 16.861 11.2218 17.0282 11.3583 17.2333L11.4583 17.375C11.6004 17.5864 11.7843 17.7665 11.9986 17.9043C12.2129 18.042 12.4532 18.1344 12.7045 18.1757C12.9559 18.2171 13.2131 18.2066 13.4603 18.1448C13.7074 18.0831 13.9393 17.9714 14.1417 17.8166L15.8333 16.55C16.2333 16.2393 16.4993 15.7874 16.5768 15.287C16.6542 14.7865 16.5373 14.2753 16.25 13.8583L16.0333 13.5416C15.903 13.3403 15.8177 13.1133 15.7832 12.876C15.7487 12.6387 15.7658 12.3967 15.8333 12.1666C15.9022 11.9203 16.03 11.6945 16.2056 11.5086C16.3813 11.3228 16.5996 11.1825 16.8417 11.1L17.0083 11.0416C17.4906 10.8743 17.8889 10.526 18.119 10.0703C18.3492 9.6147 18.3932 9.08743 18.2417 8.59996ZM10 12.9166C9.42314 12.9166 8.85923 12.7456 8.37959 12.4251C7.89994 12.1046 7.52611 11.6491 7.30535 11.1161C7.08459 10.5832 7.02683 9.99672 7.13937 9.43094C7.25191 8.86517 7.5297 8.34547 7.9376 7.93756C8.34551 7.52966 8.86521 7.25187 9.43099 7.13933C9.99676 7.02679 10.5832 7.08455 11.1162 7.30531C11.6491 7.52607 12.1046 7.8999 12.4251 8.37955C12.7456 8.85919 12.9167 9.4231 12.9167 9.99996C12.9167 10.7735 12.6094 11.5154 12.0624 12.0624C11.5154 12.6093 10.7735 12.9166 10 12.9166Z"
                fill=""
              />
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Settings
          </h1>
        </a>
      </div>

      {/* middle left bar */}
      <div
        className={`min-w-[238px] mt-10 ${
          mode ? "bg-white" : "bg-transparent border"
        } w-[20vw] max-w-[100%] h-auto py-8 shadow-md rounded-[20px] flex flex-col space-y-5`}
      >
        {/* individual icons */}
        {/* Wallet */}
        <a href="/" className="flex group items-center px-10 space-x-5">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <path
                d="M18.75 9.375V7.5C18.75 6.80961 18.1903 6.25 17.5 6.25H3.75C3.06063 6.25 2.5 5.68937 2.5 5C2.5 4.31063 3.06063 3.75 3.75 3.75H17.5C18.1903 3.75 18.75 3.19031 18.75 2.5C18.75 1.80969 18.1903 1.25 17.5 1.25H3.75C1.68211 1.25 0 2.93215 0 5V6.25V16.25C0 17.6307 1.11937 18.75 2.5 18.75H17.5C18.1903 18.75 18.75 18.1904 18.75 17.5V15.625C19.4403 15.625 20 15.0654 20 14.375V10.625C20 9.93461 19.4403 9.375 18.75 9.375ZM16.875 13.75C16.1847 13.75 15.625 13.1904 15.625 12.5C15.625 11.8096 16.1847 11.25 16.875 11.25C17.5653 11.25 18.125 11.8096 18.125 12.5C18.125 13.1904 17.5653 13.75 16.875 13.75Z"
                fill=""
              />
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Wallet
          </h1>
        </a>

        {/* Products */}
        <a href="/" className="flex items-center px-10 space-x-5 group">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <path
                d="M17 8H18V19H2V8H3V6C3 3.24 5.24 1 8 1C8.71 1 9.39 1.15 10 1.42C10.6301 1.14213 11.3113 0.99907 12 1C14.76 1 17 3.24 17 6V8ZM5 6V8H7V6C7 4.87 7.39 3.84 8.02 3H8C6.35 3 5 4.35 5 6ZM15 8V6C15 4.35 13.65 3 12 3H11.98C12.6376 3.86228 12.9957 4.91562 13 6V8H15ZM10 3.78C9.39 4.33 9 5.12 9 6V8H11V6C11 5.12 10.61 4.33 10 3.78Z"
                fill=""
              />
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Products
          </h1>
        </a>

        {/* User profile */}
        <a
          href={`/${user.userName}`}
          className="flex items-center px-10  group"
        >
          <div>
            <img
              src={user.profileImage}
              alt="bezal"
              className="w-[20px] h-[20px] rounded-full object-cover"
            />
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold pl-5 text-[20px] group-hover:text-[#4385F5]`}
          >
            @{trimmedUserName}
          </h1>
        </a>
      </div>

      {/* Explore and Bottom left bar */}
      <h1
        className={`text-[20px] 2xl:text-3xl ${
          mode ? "text-[#AAAAAA]" : "text-white"
        } mt-7`}
      >
        Explore
      </h1>

      <div
        className={`min-w-[238px] mt-7 ${
          mode ? "bg-white" : "bg-transparent border"
        } w-[20vw] max-w-[100%] h-auto py-8 shadow-md rounded-[20px] flex flex-col space-y-5`}
      >
        {/* individual icons */}
        {/* Offers */}
        <a href="/" className="flex group items-center px-10 space-x-5">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7491 12L21.8531 10.092C21.9858 9.86244 22.0218 9.58958 21.9534 9.33343C21.885 9.07727 21.7176 8.85878 21.4881 8.726L19.5781 7.622V5.422C19.5781 5.15678 19.4727 4.90243 19.2852 4.71489C19.0976 4.52735 18.8433 4.422 18.5781 4.422H16.3791L15.2761 2.513C15.1429 2.28391 14.9248 2.1165 14.6691 2.047C14.5422 2.01261 14.4098 2.00375 14.2795 2.02091C14.1493 2.03808 14.0237 2.08093 13.9101 2.147L12.0001 3.251L10.0901 2.146C9.86039 2.01339 9.58745 1.97746 9.33127 2.0461C9.0751 2.11474 8.85668 2.28232 8.72407 2.512L7.62007 4.422H5.42107C5.15586 4.422 4.9015 4.52735 4.71397 4.71489C4.52643 4.90243 4.42107 5.15678 4.42107 5.422V7.621L2.51107 8.725C2.3971 8.79055 2.29721 8.87798 2.21714 8.98226C2.13706 9.08654 2.07838 9.20561 2.04446 9.33264C2.01054 9.45966 2.00206 9.59214 2.0195 9.72246C2.03694 9.85277 2.07995 9.97836 2.14607 10.092L3.25007 12L2.14607 13.908C2.01406 14.1378 1.97824 14.4104 2.04643 14.6665C2.11462 14.9226 2.28128 15.1413 2.51007 15.275L4.42007 16.379V18.578C4.42007 18.8432 4.52543 19.0976 4.71296 19.2851C4.9005 19.4726 5.15486 19.578 5.42007 19.578H7.62007L8.72407 21.488C8.8126 21.6393 8.93901 21.765 9.09085 21.8527C9.24269 21.9404 9.41474 21.987 9.59007 21.988C9.76407 21.988 9.93707 21.942 10.0911 21.853L11.9991 20.749L13.9091 21.853C14.1387 21.9854 14.4115 22.0213 14.6675 21.9529C14.9236 21.8845 15.1421 21.7173 15.2751 21.488L16.3781 19.578H18.5771C18.8423 19.578 19.0966 19.4726 19.2842 19.2851C19.4717 19.0976 19.5771 18.8432 19.5771 18.578V16.379L21.4871 15.275C21.6008 15.2092 21.7005 15.1217 21.7805 15.0174C21.8604 14.9131 21.919 14.7941 21.9529 14.6671C21.9868 14.5402 21.9953 14.4078 21.978 14.2775C21.9607 14.1473 21.9179 14.0217 21.8521 13.908L20.7491 12ZM9.49907 6.99C9.89703 6.99013 10.2786 7.14834 10.5599 7.42984C10.8412 7.71133 10.9992 8.09304 10.9991 8.491C10.9989 8.88895 10.8407 9.27056 10.5592 9.55186C10.2777 9.83317 9.89603 9.99113 9.49807 9.991C9.10011 9.99086 8.71851 9.83265 8.4372 9.55116C8.1559 9.26966 7.99794 8.88795 7.99807 8.49C7.9982 8.09204 8.15642 7.71043 8.43791 7.42913C8.7194 7.14783 9.10111 6.98986 9.49907 6.99ZM9.79907 16.59L8.19907 15.391L14.1991 7.391L15.7991 8.59L9.79907 16.59ZM14.4991 16.99C14.302 16.9899 14.1069 16.9511 13.9249 16.8756C13.7429 16.8001 13.5775 16.6895 13.4382 16.5502C13.2989 16.4108 13.1884 16.2453 13.1131 16.0633C13.0378 15.8812 12.999 15.686 12.9991 15.489C12.9991 15.2919 13.038 15.0968 13.1135 14.9148C13.1889 14.7328 13.2995 14.5674 13.4389 14.4281C13.5783 14.2888 13.7437 14.1784 13.9258 14.103C14.1079 14.0277 14.303 13.9889 14.5001 13.989C14.898 13.9891 15.2796 14.1473 15.5609 14.4288C15.8422 14.7103 16.0002 15.092 16.0001 15.49C15.9999 15.888 15.8417 16.2696 15.5602 16.5509C15.2787 16.8322 14.897 16.9901 14.4991 16.99Z"
                fill=""
              />
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Offers
          </h1>
        </a>

        {/* Jobs */}
        <a href="/" className="flex items-center px-10 space-x-5 group">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <g clip-path="url(#clip0_1_396)">
                <path
                  d="M17.9003 15.6656C17.5712 15.3365 17.1331 15.1835 16.7013 15.2087L15.5443 14.0517C16.0138 13.4522 16.4016 12.794 16.7013 12.0855C17.1541 11.0124 17.3847 9.87421 17.3847 8.70252C17.3847 7.53083 17.1541 6.39057 16.7013 5.31949C16.2633 4.28404 15.6365 3.35549 14.838 2.5569C14.0394 1.7583 13.1108 1.13158 12.0754 0.693506C11.0022 0.240759 9.86402 0.0101929 8.69235 0.0101929C7.52065 0.0101929 6.3804 0.240759 5.30932 0.693506C4.27387 1.12948 3.34532 1.7562 2.54672 2.5548C1.74813 3.3534 1.12141 4.28195 0.683334 5.3174C0.230566 6.3906 0 7.52875 0 8.70044C0 9.87212 0.230566 11.0124 0.683313 12.0835C1.12139 13.1189 1.74811 14.0475 2.5467 14.8461C3.3453 15.6447 4.27385 16.2714 5.3093 16.7094C6.38248 17.1622 7.52063 17.3928 8.69233 17.3928C9.864 17.3928 11.0043 17.1622 12.0753 16.7094C12.7922 16.4055 13.4587 16.0136 14.0645 15.5336L15.2194 16.6885C15.1964 17.1203 15.3473 17.5583 15.6764 17.8874L17.3176 19.5286C17.6236 19.8347 18.026 19.9898 18.4285 19.9898C18.8309 19.9898 19.2333 19.8368 19.5394 19.5286C20.1535 18.9145 20.1535 17.9189 19.5394 17.3047L17.9003 15.6656ZM14.0477 12.553C13.8402 12.8381 13.6097 13.1105 13.356 13.3641C13.1087 13.6115 12.8446 13.8358 12.5679 14.037C11.4486 14.8544 10.1029 15.2946 8.69021 15.2946C6.92743 15.2946 5.27155 14.6092 4.02649 13.3621C2.78144 12.117 2.09393 10.459 2.09393 8.69835C2.09393 6.93766 2.77934 5.27969 4.02649 4.03463C5.27155 2.78958 6.92953 2.10207 8.69021 2.10207C10.4509 2.10207 12.1089 2.78748 13.3539 4.03463C14.599 5.27969 15.2865 6.93766 15.2865 8.69835C15.2886 10.1027 14.8547 11.4379 14.0477 12.553Z"
                  fill=""
                />
                <path
                  d="M8.09078 4.05981H9.29601C9.6733 4.05981 9.98561 4.35744 10.0443 4.74312H11.0986C11.0315 3.77684 10.2497 3.01178 9.29601 3.01178H8.09078C7.13708 3.01178 6.35525 3.77684 6.28818 4.74312H7.34249C7.39908 4.35535 7.71349 4.05981 8.09078 4.05981Z"
                  fill=""
                />
                <path
                  d="M11.1029 5.26715H10.0549H7.33H6.28197H4.57369C4.25509 5.26715 3.89667 5.57108 3.70174 5.76182C3.58017 5.90854 3.55711 6.00915 3.56759 6.12234C3.64514 6.87482 4.1461 7.58329 4.995 8.14084C5.74748 8.63341 6.6928 8.9583 7.72406 9.08196C8.03846 9.11969 8.36335 9.14065 8.69033 9.14065C9.29609 9.14065 9.8872 9.07358 10.4405 8.94572C11.1679 8.77804 11.8302 8.50555 12.3878 8.14084C13.2367 7.58329 13.7355 6.87273 13.8152 6.12234C13.8278 6.00706 13.7649 5.84147 13.681 5.76182C13.4861 5.57108 13.1277 5.26715 12.8091 5.26715H11.1029Z"
                  fill=""
                />
                <path
                  d="M12.851 8.84298C12.3437 9.17625 11.761 9.44245 11.128 9.6311C10.3713 9.85957 9.5455 9.97906 8.69241 9.97906C8.63162 9.97906 8.56874 9.97906 8.50795 9.97695C7.01137 9.94762 5.60701 9.54726 4.53381 8.84298C4.08107 8.54534 3.70587 8.20578 3.41242 7.83059C3.34116 7.73836 3.28876 7.75513 3.28876 7.87039V10.7923C3.28876 11.5322 3.86308 12.1338 4.57154 12.1338H10.6606H12.809C13.0417 12.1338 13.2597 12.0688 13.4462 11.9556C13.8319 11.7251 14.0918 11.2911 14.0918 10.7923V7.87251C14.0918 7.75723 14.0394 7.74046 13.9682 7.83268C13.6789 8.20576 13.3037 8.54534 12.851 8.84298Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_1_396">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Jobs
          </h1>
        </a>

        {/* MarketPlace */}
        <a href="/" className="flex items-center px-10 space-x-3 group">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <path
                d="M18.7671 7.61445L17.3017 2.18982C17.2566 2.0241 17.1872 1.86759 17.1037 1.72022C17.2277 1.54275 17.3017 1.32772 17.3017 1.0948C17.3017 0.490026 16.8112 0 16.2069 0H3.66558C3.0609 0 2.57105 0.490252 2.57105 1.0948C2.57105 1.39736 2.69343 1.6711 2.89224 1.86945C2.81062 2.01397 2.74315 2.1679 2.69917 2.33028L1.23389 7.75491C1.03554 8.48934 1.32369 9.1092 1.88823 9.25685V20H18.2045V9.08073C18.7051 8.89101 18.9536 8.30626 18.7671 7.61445ZM14.0668 3.09883L15.305 7.6821C15.324 7.75346 15.3525 7.82184 15.3797 7.89044C14.8267 8.79579 14.0232 9.18897 13.1478 8.97123C12.3793 8.78056 11.8431 8.19079 11.8315 7.77249V3.31006C11.8315 3.23784 11.8206 3.1682 11.8099 3.09887H14.0668V3.09883ZM4.69607 7.82279L5.97204 3.09883H8.12055C8.10966 3.1682 8.09904 3.2378 8.09904 3.31001V7.85632L8.09628 7.85497C7.58542 8.82128 6.79582 9.25256 5.93096 9.03766C5.21407 8.85987 4.71428 8.30631 4.71428 7.92113H4.66036C4.6718 7.88796 4.68689 7.85655 4.69607 7.82279ZM13.592 18.8849H4.78925V15.3639H6.36897C6.52036 15.0222 6.86116 14.7833 7.25922 14.7833C7.65665 14.7833 7.9979 15.0222 8.14902 15.3639H11.3641C11.4093 14.8679 11.8218 14.4781 12.3297 14.4781C12.8372 14.4781 13.2499 14.8679 13.2949 15.3639H13.5921V18.8849H13.592ZM6.60176 14.0963C6.60176 13.7174 6.90939 13.4099 7.28846 13.4099C7.66754 13.4099 7.9749 13.7175 7.9749 14.0963C7.9749 14.4758 7.66754 14.7833 7.28846 14.7833C6.90939 14.7833 6.60176 14.4758 6.60176 14.0963ZM11.6722 13.7912C11.6722 13.4123 11.9796 13.1047 12.3586 13.1047C12.7378 13.1047 13.0452 13.4123 13.0452 13.7912C13.0452 14.1705 12.7378 14.4781 12.3586 14.4781C11.9796 14.4781 11.6722 14.1705 11.6722 13.7912ZM17.3596 19.155H16.2798V12.0309H3.88571V19.155H2.7333V9.30299L2.98136 9.30778C3.56841 9.31967 4.18073 8.87854 4.51236 8.26545C4.70181 8.7238 5.23255 9.15485 5.86358 9.31144C5.98677 9.34195 6.15887 9.37186 6.3607 9.37186C6.85796 9.37186 7.53481 9.18897 8.10112 8.38725C8.11179 9.15128 8.73617 9.49538 9.50752 9.49538H10.4229C11.0882 9.49538 11.6419 9.03283 11.7898 8.41287C12.0622 8.78761 12.5381 9.11047 13.0804 9.24478C13.2122 9.27764 13.3969 9.30959 13.6128 9.30959C14.1591 9.30959 14.9069 9.1027 15.5232 8.18799C15.8614 8.76791 16.4525 9.17817 17.0195 9.1671L17.3596 9.1605V19.155Z"
                fill=""
              />
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            MarketPlace
          </h1>
        </a>

        {/* Pages*/}
        <a href="/" className="flex items-center px-10 space-x-3 group">
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-[#4385F5] ${
                mode ? "fill-[#5D5F63]" : "fill-[#FFFFFF]"
              }`}
            >
              <g clip-path="url(#clip0_1_412)">
                <path
                  d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0ZM6.8396 4.35547C9.85633 4.36898 12.0833 7.37903 15.6567 5.06713V11.1169C12.7697 14.004 10.0626 9.33178 5.84472 10.4797V15.6445H4.34325V5.06713C5.25033 4.54343 6.07063 4.35203 6.8396 4.35547Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_1_412">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1
            className={`${
              mode ? "text-[#5D5F63]" : "text-white"
            } font-semibold text-[20px] group-hover:text-[#4385F5]`}
          >
            Pages
          </h1>
        </a>
      </div>
    </div>
  );
};
export default UnLeftBar;
