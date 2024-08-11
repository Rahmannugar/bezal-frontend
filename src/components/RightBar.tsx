const RightBar = () => {
  return (
    <div className="px-5 pt-10">
      {/* top right bar */}
      <div className="min-w-[260px] w-[20vw] max-w-[100%] px-3 h-auto py-4 bg-white shadow-md rounded-[20px] flex flex-col space-y-5">
        {/* top menu */}
        <div className="flex justify-between items-center">
          {/* left top menu */}
          <div className="flex items-center space-x-1">
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
            <h1 className="text-[#000000] font-semibold">Trending</h1>
          </div>
          <button className="text-[#4385F5]">See more</button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

        {/* follow section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-[#5D5F63]">#UKRAINE</h1>
            <h2 className="text-[#AAAAAA] text-sm">345 post</h2>
          </div>
          {/* follow button */}
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
                fill="white"
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

        {/* follow section */}
        <div className="flex justify-between items-center pt-3">
          <div>
            <h1 className="font-semibold text-[#5D5F63]">#UKRAINE</h1>
            <h2 className="text-[#AAAAAA] text-sm">345 post</h2>
          </div>
          {/* follow button */}
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
                fill="white"
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
      <div className="min-w-[260px] w-[20vw] max-w-[100%] px-3 h-auto py-4 bg-white shadow-md rounded-[20px] flex flex-col space-y-5">
        {/* top menu */}
        <div className="flex justify-between items-center">
          {/* left top menu */}
          <div className="flex items-center space-x-1">
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
            <h1 className="text-[#000000] font-semibold">Trending</h1>
          </div>
          <button className="text-[#4385F5]">See more</button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

        {/* follow section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-[#5D5F63]">#UKRAINE</h1>
            <h2 className="text-[#AAAAAA] text-sm">345 post</h2>
          </div>
          {/* follow button */}
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
                fill="white"
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

        {/* follow section */}
        <div className="flex justify-between items-center pt-3">
          <div>
            <h1 className="font-semibold text-[#5D5F63]">#UKRAINE</h1>
            <h2 className="text-[#AAAAAA] text-sm">345 post</h2>
          </div>
          {/* follow button */}
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
                fill="white"
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

      {/* group bar */}
      <div className="min-w-[260px] w-[20vw] max-w-[100%] px-3 h-auto py-4 bg-white shadow-md rounded-[20px] flex flex-col space-y-5">
        {/* top menu */}
        <div className="flex justify-between items-center">
          {/* left top menu */}
          <div className="flex items-center space-x-1">
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
            <h1 className="text-[#000000] font-semibold">Trending</h1>
          </div>
          <button className="text-[#4385F5]">See more</button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

        {/* follow section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-[#5D5F63]">#UKRAINE</h1>
            <h2 className="text-[#AAAAAA] text-sm">345 post</h2>
          </div>
          {/* follow button */}
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
                fill="white"
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

        {/* follow section */}
        <div className="flex justify-between items-center pt-3">
          <div>
            <h1 className="font-semibold text-[#5D5F63]">#UKRAINE</h1>
            <h2 className="text-[#AAAAAA] text-sm">345 post</h2>
          </div>
          {/* follow button */}
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
                fill="white"
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
    </div>
  );
};
export default RightBar;
