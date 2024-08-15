import { useSelector } from "react-redux";
import { RootState } from "../states/store";

const RightBar = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  return (
    <div className="px-5 pt-10 space-y-10">
      {/* top right bar */}
      <div
        className={` ${
          mode ? "bg-white" : "bg-transparent border"
        } min-w-[280px] w-[20vw] max-w-[100%] px-3 h-auto py-4 shadow-md rounded-[20px] flex flex-col space-y-5`}
      >
        {/* top menu */}
        <div className="flex justify-between items-center">
          {/* left top menu */}
          <div className="flex items-center space-x-2">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.625 9.99996C20.625 11.875 20 14.375 17 15.375C17.875 13.25 18 11.125 17.375 9.12496C16.5 6.49996 13.625 4.49996 11.625 3.37496C11.125 2.99996 10.25 3.49996 10.375 4.24996C10.375 5.62496 10 7.62496 7.875 9.74996C5.125 12.5 3.75 15.375 3.75 18.125C3.75 21.75 6.25 26.25 11.25 26.25C6.25 21.25 10 16.875 10 16.875C11 24.25 16.25 26.25 18.75 26.25C20.875 26.25 25 24.75 25 18.25C25 14.375 23.375 11.375 22 9.62496C21.625 8.99996 20.75 9.37496 20.625 9.99996Z"
                fill="#FF7A00"
              />
            </svg>
            <h1
              className={` ${
                mode ? "text-[#000000]" : "text-white"
              } font-semibold`}
            >
              Trending
            </h1>
          </div>
          <button className="text-[#4385F5]">See more</button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

        {/* Follow section */}
        <div className="flex justify-between items-center">
          <div>
            <h1
              className={`font-semibold ${
                mode ? "text-[#5D5F63]" : "text-[#cdcdcd]"
              }`}
            >
              #UKRAINE
            </h1>
            <h2
              className={`${
                mode ? " text-[#AAAAAA]" : "text-[#cdcdcd]"
              } text-sm`}
            >
              345 post
            </h2>
          </div>
          {/* Follow button */}
          <button>
            <svg
              width="100"
              height="40"
              viewBox="0 0 100 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="99"
                height="39"
                rx="9.5"
                fill={`${mode ? "white" : ""}`}
              />
              <rect
                x="0.5"
                y="0.5"
                width="99"
                height="39"
                rx="9.5"
                stroke="#AAAAAA"
              />
              <circle
                cx="20"
                cy="20"
                r="8.5"
                stroke="#AAAAAA"
                stroke-width="2"
              />
              <line
                x1="20.0002"
                y1="16"
                x2="20.0002"
                y2="24"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <line
                x1="16"
                y1="20"
                x2="24"
                y2="20"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <path
                d="M47.036 14.848V16.032H42.188V19.792H46.124V20.976H42.188V26H40.732V14.848H47.036ZM52.6185 26.144C51.7972 26.144 51.0505 25.9573 50.3785 25.584C49.7172 25.2107 49.1945 24.6827 48.8105 24C48.4372 23.3067 48.2505 22.5067 48.2505 21.6C48.2505 20.704 48.4425 19.9147 48.8265 19.232C49.2212 18.5387 49.7545 18.0107 50.4265 17.648C51.0985 17.2747 51.8505 17.088 52.6825 17.088C53.5145 17.088 54.2665 17.2747 54.9385 17.648C55.6105 18.0107 56.1385 18.5333 56.5225 19.216C56.9172 19.8987 57.1145 20.6933 57.1145 21.6C57.1145 22.5067 56.9118 23.3067 56.5065 24C56.1118 24.6827 55.5732 25.2107 54.8905 25.584C54.2078 25.9573 53.4505 26.144 52.6185 26.144ZM52.6185 24.864C53.1412 24.864 53.6318 24.7413 54.0905 24.496C54.5492 24.2507 54.9172 23.8827 55.1945 23.392C55.4825 22.9013 55.6265 22.304 55.6265 21.6C55.6265 20.896 55.4878 20.2987 55.2105 19.808C54.9332 19.3173 54.5705 18.9547 54.1225 18.72C53.6745 18.4747 53.1892 18.352 52.6665 18.352C52.1332 18.352 51.6425 18.4747 51.1945 18.72C50.7572 18.9547 50.4052 19.3173 50.1385 19.808C49.8718 20.2987 49.7385 20.896 49.7385 21.6C49.7385 22.3147 49.8665 22.9173 50.1225 23.408C50.3892 23.8987 50.7412 24.2667 51.1785 24.512C51.6158 24.7467 52.0958 24.864 52.6185 24.864ZM60.4849 14.16V26H59.0289V14.16H60.4849ZM64.4224 14.16V26H62.9664V14.16H64.4224ZM70.7279 26.144C69.9065 26.144 69.1599 25.9573 68.4879 25.584C67.8265 25.2107 67.3039 24.6827 66.9199 24C66.5465 23.3067 66.3599 22.5067 66.3599 21.6C66.3599 20.704 66.5519 19.9147 66.9359 19.232C67.3305 18.5387 67.8639 18.0107 68.5359 17.648C69.2079 17.2747 69.9599 17.088 70.7919 17.088C71.6239 17.088 72.3759 17.2747 73.0479 17.648C73.7199 18.0107 74.2479 18.5333 74.6319 19.216C75.0265 19.8987 75.2239 20.6933 75.2239 21.6C75.2239 22.5067 75.0212 23.3067 74.6159 24C74.2212 24.6827 73.6825 25.2107 72.9999 25.584C72.3172 25.9573 71.5599 26.144 70.7279 26.144ZM70.7279 24.864C71.2505 24.864 71.7412 24.7413 72.1999 24.496C72.6585 24.2507 73.0265 23.8827 73.3039 23.392C73.5919 22.9013 73.7359 22.304 73.7359 21.6C73.7359 20.896 73.5972 20.2987 73.3199 19.808C73.0425 19.3173 72.6799 18.9547 72.2319 18.72C71.7839 18.4747 71.2985 18.352 70.7759 18.352C70.2425 18.352 69.7519 18.4747 69.3039 18.72C68.8665 18.9547 68.5145 19.3173 68.2479 19.808C67.9812 20.2987 67.8479 20.896 67.8479 21.6C67.8479 22.3147 67.9759 22.9173 68.2319 23.408C68.4985 23.8987 68.8505 24.2667 69.2879 24.512C69.7252 24.7467 70.2052 24.864 70.7279 24.864ZM88.8183 17.232L86.0823 26H84.5783L82.4663 19.04L80.3543 26H78.8503L76.0983 17.232H77.5863L79.6023 24.592L81.7783 17.232H83.2663L85.3943 24.608L87.3783 17.232H88.8183Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>

        {/* Follow section */}
        <div className="flex justify-between items-center pt-3">
          <div>
            <h1
              className={`font-semibold ${
                mode ? "text-[#5D5F63]" : "text-[#cdcdcd]"
              }`}
            >
              #UKRAINE
            </h1>
            <h2
              className={`${
                mode ? " text-[#AAAAAA]" : "text-[#cdcdcd]"
              } text-sm`}
            >
              345 post
            </h2>
          </div>
          {/* Follow button */}
          <button>
            <svg
              width="100"
              height="40"
              viewBox="0 0 100 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="99"
                height="39"
                rx="9.5"
                fill={`${mode ? "white" : ""}`}
              />
              <rect
                x="0.5"
                y="0.5"
                width="99"
                height="39"
                rx="9.5"
                stroke="#AAAAAA"
              />
              <circle
                cx="20"
                cy="20"
                r="8.5"
                stroke="#AAAAAA"
                stroke-width="2"
              />
              <line
                x1="20.0002"
                y1="16"
                x2="20.0002"
                y2="24"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <line
                x1="16"
                y1="20"
                x2="24"
                y2="20"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <path
                d="M47.036 14.848V16.032H42.188V19.792H46.124V20.976H42.188V26H40.732V14.848H47.036ZM52.6185 26.144C51.7972 26.144 51.0505 25.9573 50.3785 25.584C49.7172 25.2107 49.1945 24.6827 48.8105 24C48.4372 23.3067 48.2505 22.5067 48.2505 21.6C48.2505 20.704 48.4425 19.9147 48.8265 19.232C49.2212 18.5387 49.7545 18.0107 50.4265 17.648C51.0985 17.2747 51.8505 17.088 52.6825 17.088C53.5145 17.088 54.2665 17.2747 54.9385 17.648C55.6105 18.0107 56.1385 18.5333 56.5225 19.216C56.9172 19.8987 57.1145 20.6933 57.1145 21.6C57.1145 22.5067 56.9118 23.3067 56.5065 24C56.1118 24.6827 55.5732 25.2107 54.8905 25.584C54.2078 25.9573 53.4505 26.144 52.6185 26.144ZM52.6185 24.864C53.1412 24.864 53.6318 24.7413 54.0905 24.496C54.5492 24.2507 54.9172 23.8827 55.1945 23.392C55.4825 22.9013 55.6265 22.304 55.6265 21.6C55.6265 20.896 55.4878 20.2987 55.2105 19.808C54.9332 19.3173 54.5705 18.9547 54.1225 18.72C53.6745 18.4747 53.1892 18.352 52.6665 18.352C52.1332 18.352 51.6425 18.4747 51.1945 18.72C50.7572 18.9547 50.4052 19.3173 50.1385 19.808C49.8718 20.2987 49.7385 20.896 49.7385 21.6C49.7385 22.3147 49.8665 22.9173 50.1225 23.408C50.3892 23.8987 50.7412 24.2667 51.1785 24.512C51.6158 24.7467 52.0958 24.864 52.6185 24.864ZM60.4849 14.16V26H59.0289V14.16H60.4849ZM64.4224 14.16V26H62.9664V14.16H64.4224ZM70.7279 26.144C69.9065 26.144 69.1599 25.9573 68.4879 25.584C67.8265 25.2107 67.3039 24.6827 66.9199 24C66.5465 23.3067 66.3599 22.5067 66.3599 21.6C66.3599 20.704 66.5519 19.9147 66.9359 19.232C67.3305 18.5387 67.8639 18.0107 68.5359 17.648C69.2079 17.2747 69.9599 17.088 70.7919 17.088C71.6239 17.088 72.3759 17.2747 73.0479 17.648C73.7199 18.0107 74.2479 18.5333 74.6319 19.216C75.0265 19.8987 75.2239 20.6933 75.2239 21.6C75.2239 22.5067 75.0212 23.3067 74.6159 24C74.2212 24.6827 73.6825 25.2107 72.9999 25.584C72.3172 25.9573 71.5599 26.144 70.7279 26.144ZM70.7279 24.864C71.2505 24.864 71.7412 24.7413 72.1999 24.496C72.6585 24.2507 73.0265 23.8827 73.3039 23.392C73.5919 22.9013 73.7359 22.304 73.7359 21.6C73.7359 20.896 73.5972 20.2987 73.3199 19.808C73.0425 19.3173 72.6799 18.9547 72.2319 18.72C71.7839 18.4747 71.2985 18.352 70.7759 18.352C70.2425 18.352 69.7519 18.4747 69.3039 18.72C68.8665 18.9547 68.5145 19.3173 68.2479 19.808C67.9812 20.2987 67.8479 20.896 67.8479 21.6C67.8479 22.3147 67.9759 22.9173 68.2319 23.408C68.4985 23.8987 68.8505 24.2667 69.2879 24.512C69.7252 24.7467 70.2052 24.864 70.7279 24.864ZM88.8183 17.232L86.0823 26H84.5783L82.4663 19.04L80.3543 26H78.8503L76.0983 17.232H77.5863L79.6023 24.592L81.7783 17.232H83.2663L85.3943 24.608L87.3783 17.232H88.8183Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* friend bar */}
      <div
        className={`min-w-[280px] w-[20vw] max-w-[100%] px-3 h-auto py-4 shadow-md rounded-[20px] flex flex-col space-y-5 ${
          mode ? "bg-white" : "bg-transparent border"
        }`}
      >
        {/* top menu */}
        <div className="flex justify-between items-center">
          {/* left top menu */}
          <div className="flex items-center space-x-2">
            <svg
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12C11.9016 12 14.25 9.65156 14.25 6.75C14.25 3.84844 11.9016 1.5 9 1.5C6.09844 1.5 3.75 3.84844 3.75 6.75C3.75 9.65156 6.09844 12 9 12ZM12.6 13.5H12.2109C11.2359 13.9688 10.1531 14.25 9 14.25C7.84688 14.25 6.76875 13.9688 5.78906 13.5H5.4C2.41875 13.5 0 15.9188 0 18.9V20.25C0 21.4922 1.00781 22.5 2.25 22.5H15.75C16.9922 22.5 18 21.4922 18 20.25V18.9C18 15.9188 15.5812 13.5 12.6 13.5ZM22.5 12C24.9844 12 27 9.98438 27 7.5C27 5.01562 24.9844 3 22.5 3C20.0156 3 18 5.01562 18 7.5C18 9.98438 20.0156 12 22.5 12ZM24.75 13.5H24.5719C23.9203 13.725 23.2313 13.875 22.5 13.875C21.7687 13.875 21.0797 13.725 20.4281 13.5H20.25C19.2938 13.5 18.4125 13.7766 17.6391 14.2219C18.7828 15.4547 19.5 17.0906 19.5 18.9V20.7C19.5 20.8031 19.4766 20.9016 19.4719 21H27.75C28.9922 21 30 19.9922 30 18.75C30 15.8484 27.6516 13.5 24.75 13.5Z"
                fill="#4385F5"
              />
            </svg>
            <h1
              className={`font-semibold ${
                mode ? "text-[#000000]" : "text-white"
              }`}
            >
              Friend Suggestion
            </h1>
          </div>
          <button className="text-[#4385F5]">See more</button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

        {/* Add section */}
        <div className="flex justify-between items-center">
          <div
            className={`${
              mode ? "text-[#5D5F63]" : "text-[#cdcdcd]"
            } font-semibold  flex items-center space-x-2`}
          >
            <img
              src="https://i.ibb.co/KsMc2Qn/bezal.png"
              alt="bezal"
              className="w-[40px] h-[40px] mt-[-10px] rounded-full"
            />
            <h1>Micheal Great</h1>
          </div>

          {/* Add button */}
          <button>
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                fill={`${mode ? "white" : ""}`}
              />
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                stroke="#AAAAAA"
              />
              <circle
                cx="18.5"
                cy="20"
                r="8.5"
                stroke="#AAAAAA"
                stroke-width="2"
              />
              <line
                x1="18.5002"
                y1="16"
                x2="18.5002"
                y2="24"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <line
                x1="14.5"
                y1="20"
                x2="22.5"
                y2="20"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <path
                d="M45.824 23.52H40.96L40.064 26H38.528L42.56 14.912H44.24L48.256 26H46.72L45.824 23.52ZM45.408 22.336L43.392 16.704L41.376 22.336H45.408ZM49.4693 21.584C49.4693 20.688 49.6506 19.904 50.0133 19.232C50.3759 18.5493 50.8719 18.0213 51.5013 17.648C52.1413 17.2747 52.8559 17.088 53.6453 17.088C54.3279 17.088 54.9626 17.248 55.5493 17.568C56.1359 17.8773 56.5839 18.288 56.8933 18.8V14.16H58.3653V26H56.8933V24.352C56.6053 24.8747 56.1786 25.3067 55.6133 25.648C55.0479 25.9787 54.3866 26.144 53.6293 26.144C52.8506 26.144 52.1413 25.952 51.5013 25.568C50.8719 25.184 50.3759 24.6453 50.0133 23.952C49.6506 23.2587 49.4693 22.4693 49.4693 21.584ZM56.8933 21.6C56.8933 20.9387 56.7599 20.3627 56.4933 19.872C56.2266 19.3813 55.8639 19.008 55.4053 18.752C54.9573 18.4853 54.4613 18.352 53.9173 18.352C53.3733 18.352 52.8773 18.48 52.4293 18.736C51.9813 18.992 51.6239 19.3653 51.3573 19.856C51.0906 20.3467 50.9573 20.9227 50.9573 21.584C50.9573 22.256 51.0906 22.8427 51.3573 23.344C51.6239 23.8347 51.9813 24.2133 52.4293 24.48C52.8773 24.736 53.3733 24.864 53.9173 24.864C54.4613 24.864 54.9573 24.736 55.4053 24.48C55.8639 24.2133 56.2266 23.8347 56.4933 23.344C56.7599 22.8427 56.8933 22.2613 56.8933 21.6ZM60.2818 21.584C60.2818 20.688 60.4631 19.904 60.8258 19.232C61.1884 18.5493 61.6844 18.0213 62.3138 17.648C62.9538 17.2747 63.6684 17.088 64.4578 17.088C65.1404 17.088 65.7751 17.248 66.3618 17.568C66.9484 17.8773 67.3964 18.288 67.7058 18.8V14.16H69.1778V26H67.7058V24.352C67.4178 24.8747 66.9911 25.3067 66.4258 25.648C65.8604 25.9787 65.1991 26.144 64.4418 26.144C63.6631 26.144 62.9538 25.952 62.3138 25.568C61.6844 25.184 61.1884 24.6453 60.8258 23.952C60.4631 23.2587 60.2818 22.4693 60.2818 21.584ZM67.7058 21.6C67.7058 20.9387 67.5724 20.3627 67.3058 19.872C67.0391 19.3813 66.6764 19.008 66.2178 18.752C65.7698 18.4853 65.2738 18.352 64.7298 18.352C64.1858 18.352 63.6898 18.48 63.2418 18.736C62.7938 18.992 62.4364 19.3653 62.1698 19.856C61.9031 20.3467 61.7698 20.9227 61.7698 21.584C61.7698 22.256 61.9031 22.8427 62.1698 23.344C62.4364 23.8347 62.7938 24.2133 63.2418 24.48C63.6898 24.736 64.1858 24.864 64.7298 24.864C65.2738 24.864 65.7698 24.736 66.2178 24.48C66.6764 24.2133 67.0391 23.8347 67.3058 23.344C67.5724 22.8427 67.7058 22.2613 67.7058 21.6Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>

        {/* Add section */}
        <div className="flex justify-between items-center pt-3">
          <div
            className={`${
              mode ? "text-[#5D5F63]" : "text-[#cdcdcd]"
            } font-semibold  flex items-center space-x-2`}
          >
            <img
              src="https://i.ibb.co/KsMc2Qn/bezal.png"
              alt="bezal"
              className="w-[40px] h-[40px] mt-[-10px] rounded-full"
            />
            <h1>Jane Doe</h1>
          </div>

          {/* Add button */}
          <button>
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                fill={`${mode ? "white" : ""}`}
              />
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                stroke="#AAAAAA"
              />
              <circle
                cx="18.5"
                cy="20"
                r="8.5"
                stroke="#AAAAAA"
                stroke-width="2"
              />
              <line
                x1="18.5002"
                y1="16"
                x2="18.5002"
                y2="24"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <line
                x1="14.5"
                y1="20"
                x2="22.5"
                y2="20"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <path
                d="M45.824 23.52H40.96L40.064 26H38.528L42.56 14.912H44.24L48.256 26H46.72L45.824 23.52ZM45.408 22.336L43.392 16.704L41.376 22.336H45.408ZM49.4693 21.584C49.4693 20.688 49.6506 19.904 50.0133 19.232C50.3759 18.5493 50.8719 18.0213 51.5013 17.648C52.1413 17.2747 52.8559 17.088 53.6453 17.088C54.3279 17.088 54.9626 17.248 55.5493 17.568C56.1359 17.8773 56.5839 18.288 56.8933 18.8V14.16H58.3653V26H56.8933V24.352C56.6053 24.8747 56.1786 25.3067 55.6133 25.648C55.0479 25.9787 54.3866 26.144 53.6293 26.144C52.8506 26.144 52.1413 25.952 51.5013 25.568C50.8719 25.184 50.3759 24.6453 50.0133 23.952C49.6506 23.2587 49.4693 22.4693 49.4693 21.584ZM56.8933 21.6C56.8933 20.9387 56.7599 20.3627 56.4933 19.872C56.2266 19.3813 55.8639 19.008 55.4053 18.752C54.9573 18.4853 54.4613 18.352 53.9173 18.352C53.3733 18.352 52.8773 18.48 52.4293 18.736C51.9813 18.992 51.6239 19.3653 51.3573 19.856C51.0906 20.3467 50.9573 20.9227 50.9573 21.584C50.9573 22.256 51.0906 22.8427 51.3573 23.344C51.6239 23.8347 51.9813 24.2133 52.4293 24.48C52.8773 24.736 53.3733 24.864 53.9173 24.864C54.4613 24.864 54.9573 24.736 55.4053 24.48C55.8639 24.2133 56.2266 23.8347 56.4933 23.344C56.7599 22.8427 56.8933 22.2613 56.8933 21.6ZM60.2818 21.584C60.2818 20.688 60.4631 19.904 60.8258 19.232C61.1884 18.5493 61.6844 18.0213 62.3138 17.648C62.9538 17.2747 63.6684 17.088 64.4578 17.088C65.1404 17.088 65.7751 17.248 66.3618 17.568C66.9484 17.8773 67.3964 18.288 67.7058 18.8V14.16H69.1778V26H67.7058V24.352C67.4178 24.8747 66.9911 25.3067 66.4258 25.648C65.8604 25.9787 65.1991 26.144 64.4418 26.144C63.6631 26.144 62.9538 25.952 62.3138 25.568C61.6844 25.184 61.1884 24.6453 60.8258 23.952C60.4631 23.2587 60.2818 22.4693 60.2818 21.584ZM67.7058 21.6C67.7058 20.9387 67.5724 20.3627 67.3058 19.872C67.0391 19.3813 66.6764 19.008 66.2178 18.752C65.7698 18.4853 65.2738 18.352 64.7298 18.352C64.1858 18.352 63.6898 18.48 63.2418 18.736C62.7938 18.992 62.4364 19.3653 62.1698 19.856C61.9031 20.3467 61.7698 20.9227 61.7698 21.584C61.7698 22.256 61.9031 22.8427 62.1698 23.344C62.4364 23.8347 62.7938 24.2133 63.2418 24.48C63.6898 24.736 64.1858 24.864 64.7298 24.864C65.2738 24.864 65.7698 24.736 66.2178 24.48C66.6764 24.2133 67.0391 23.8347 67.3058 23.344C67.5724 22.8427 67.7058 22.2613 67.7058 21.6Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* group bar */}
      <div className="min-w-[280px] w-[20vw] max-w-[100%] px-3 h-auto py-4 bg-white shadow-md rounded-[20px] flex flex-col space-y-5">
        {/* top menu */}
        <div className="flex justify-between items-center">
          {/* left top menu */}
          <div className="flex items-center space-x-2">
            <svg
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12C11.9016 12 14.25 9.65156 14.25 6.75C14.25 3.84844 11.9016 1.5 9 1.5C6.09844 1.5 3.75 3.84844 3.75 6.75C3.75 9.65156 6.09844 12 9 12ZM12.6 13.5H12.2109C11.2359 13.9688 10.1531 14.25 9 14.25C7.84688 14.25 6.76875 13.9688 5.78906 13.5H5.4C2.41875 13.5 0 15.9188 0 18.9V20.25C0 21.4922 1.00781 22.5 2.25 22.5H15.75C16.9922 22.5 18 21.4922 18 20.25V18.9C18 15.9188 15.5812 13.5 12.6 13.5ZM22.5 12C24.9844 12 27 9.98438 27 7.5C27 5.01562 24.9844 3 22.5 3C20.0156 3 18 5.01562 18 7.5C18 9.98438 20.0156 12 22.5 12ZM24.75 13.5H24.5719C23.9203 13.725 23.2313 13.875 22.5 13.875C21.7687 13.875 21.0797 13.725 20.4281 13.5H20.25C19.2938 13.5 18.4125 13.7766 17.6391 14.2219C18.7828 15.4547 19.5 17.0906 19.5 18.9V20.7C19.5 20.8031 19.4766 20.9016 19.4719 21H27.75C28.9922 21 30 19.9922 30 18.75C30 15.8484 27.6516 13.5 24.75 13.5Z"
                fill="#4385F5"
              />
            </svg>
            <h1 className="text-[#000000] font-semibold">Groups</h1>
          </div>
          <button className="text-[#4385F5]">See more</button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

        {/* Join section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/KsMc2Qn/bezal.png"
              alt="bezal"
              className="w-[40px] h-[40px] mt-[-10px] rounded-full"
            />
            <div>
              <h1 className="font-semibold text-[#5D5F63]">Crypto</h1>
              <h2 className="text-[#AAAAAA] text-sm">33k members</h2>
            </div>
          </div>

          {/* Join button */}
          <button>
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                stroke="#AAAAAA"
              />
              <circle
                cx="18.5"
                cy="20"
                r="8.5"
                stroke="#AAAAAA"
                stroke-width="2"
              />
              <line
                x1="18.5002"
                y1="16"
                x2="18.5002"
                y2="24"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <line
                x1="14.5"
                y1="19.9998"
                x2="22.5"
                y2="19.9998"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <path
                d="M43.376 23.088C43.376 24.016 42.912 24.816 41.76 24.816C40.608 24.816 40.128 24 40.112 22.976H38.656C38.656 24.928 39.904 26.112 41.76 26.112C43.6 26.112 44.848 24.944 44.848 23.088V14.848H43.376V23.088ZM56.0364 21.6C56.0364 18.832 54.1004 17.088 51.6044 17.088C49.1244 17.088 47.1724 18.832 47.1724 21.6C47.1724 24.384 49.0604 26.144 51.5404 26.144C54.0364 26.144 56.0364 24.384 56.0364 21.6ZM48.6604 21.6C48.6604 19.392 50.0524 18.352 51.5884 18.352C53.0924 18.352 54.5484 19.392 54.5484 21.6C54.5484 23.824 53.0604 24.864 51.5404 24.864C50.0204 24.864 48.6604 23.824 48.6604 21.6ZM57.9508 26H59.4068V17.232H57.9508V26ZM58.7028 15.808C59.2308 15.808 59.6628 15.376 59.6628 14.816C59.6628 14.256 59.2308 13.824 58.7028 13.824C58.1428 13.824 57.7108 14.256 57.7108 14.816C57.7108 15.376 58.1428 15.808 58.7028 15.808ZM68.3043 26H69.7443V20.832C69.7443 18.32 68.1923 17.072 66.1603 17.072C64.9763 17.072 63.9203 17.568 63.3443 18.48V17.232H61.8883V26H63.3443V21.152C63.3443 19.264 64.3683 18.336 65.8563 18.336C67.3283 18.336 68.3043 19.248 68.3043 21.04V26Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>

        {/* Join section */}
        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/KsMc2Qn/bezal.png"
              alt="bezal"
              className="w-[40px] h-[40px] mt-[-10px] rounded-full"
            />
            <div>
              <h1 className="font-semibold text-[#5D5F63]">EveryDay group</h1>
              <h2 className="text-[#AAAAAA] text-sm">20k members</h2>
            </div>
          </div>

          {/* Join button */}
          <button>
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="39"
                rx="9.5"
                stroke="#AAAAAA"
              />
              <circle
                cx="18.5"
                cy="20"
                r="8.5"
                stroke="#AAAAAA"
                stroke-width="2"
              />
              <line
                x1="18.5002"
                y1="16"
                x2="18.5002"
                y2="24"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <line
                x1="14.5"
                y1="19.9998"
                x2="22.5"
                y2="19.9998"
                stroke="#AAAAAA"
                stroke-width="1.6"
              />
              <path
                d="M43.376 23.088C43.376 24.016 42.912 24.816 41.76 24.816C40.608 24.816 40.128 24 40.112 22.976H38.656C38.656 24.928 39.904 26.112 41.76 26.112C43.6 26.112 44.848 24.944 44.848 23.088V14.848H43.376V23.088ZM56.0364 21.6C56.0364 18.832 54.1004 17.088 51.6044 17.088C49.1244 17.088 47.1724 18.832 47.1724 21.6C47.1724 24.384 49.0604 26.144 51.5404 26.144C54.0364 26.144 56.0364 24.384 56.0364 21.6ZM48.6604 21.6C48.6604 19.392 50.0524 18.352 51.5884 18.352C53.0924 18.352 54.5484 19.392 54.5484 21.6C54.5484 23.824 53.0604 24.864 51.5404 24.864C50.0204 24.864 48.6604 23.824 48.6604 21.6ZM57.9508 26H59.4068V17.232H57.9508V26ZM58.7028 15.808C59.2308 15.808 59.6628 15.376 59.6628 14.816C59.6628 14.256 59.2308 13.824 58.7028 13.824C58.1428 13.824 57.7108 14.256 57.7108 14.816C57.7108 15.376 58.1428 15.808 58.7028 15.808ZM68.3043 26H69.7443V20.832C69.7443 18.32 68.1923 17.072 66.1603 17.072C64.9763 17.072 63.9203 17.568 63.3443 18.48V17.232H61.8883V26H63.3443V21.152C63.3443 19.264 64.3683 18.336 65.8563 18.336C67.3283 18.336 68.3043 19.248 68.3043 21.04V26Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default RightBar;
