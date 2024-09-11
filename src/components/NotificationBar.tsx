import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { io } from "socket.io-client";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import {
  addNotification,
  markNotificationRead,
  markNotificationsRead,
} from "../states/userSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

type Notification = {
  _id: string;
  msg: string;
  read: boolean;
  image: string;
  postUrl: string;
  name: string;
  createdAt: Date;
};

const NotificationBar = () => {
  const dispatch = useDispatch();
  //backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const socket = io(backendURL, {
    withCredentials: true,
  });

  const mode = useSelector((state: RootState) => state.user.mode);
  const user = useSelector((state: RootState) => state.user.user);

  const notifications = useSelector(
    (state: RootState) => state.user.user.notifications
  );

  const [realTimeNotifications, setRealTimeNotifications] = useState<
    Notification[]
  >([]);

  const debouncedNotificationHandler = debounce((data: Notification) => {
    setRealTimeNotifications((prevNotifications) => [
      ...prevNotifications,
      data,
    ]);
    dispatch(addNotification(data));
  }, 2000);

  useEffect(() => {
    // Listen for real-time notifications
    socket.on("newNotification", (data) => {
      debouncedNotificationHandler(data);
    });

    return () => {
      socket.off("newNotification");
    };
  }, [dispatch, socket]);

  const formatTimeAgo = (timestamp: Date) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 7) {
      // Return the exact date if more than 7 days have passed
      return postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else if (diffInHrs >= 72) {
      // After 72 hours, show days ago
      return diffInDays + " days ago";
    } else if (diffInHrs > 0) {
      // Before 72 hours, show hours ago
      return diffInHrs + " hours ago";
    } else if (diffInMins > 0) {
      return diffInMins === 1 ? "1 minute ago" : `${diffInMins} minutes ago`;
    } else {
      return "Just now";
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await axios.patch(
        `${backendURL}/notifications/read/${user._id}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(markNotificationRead(id));
      }
    } catch (error) {
      // Error handling
      console.log(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await axios.patch(
        `${backendURL}/notifications/readAll/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(markNotificationsRead());
      }
    } catch (error) {
      // Error handling
      console.log(error);
    }
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div
        className={`${
          mode ? "bg-white text-black" : "bg-transparent text-white border"
        }  md:min-w-[450px] mx-5 md:mx-0 lg:min-w-[600px] md:w-[50vw] max-w-[100%] min-w-[270px] w-[90vw] overflow-hidden rounded-[20px] mt-10 shadow-md`}
      >
        <h1
          className={`text-center py-3 rounded-t-[20px] hover:bg-[#4385F5]
 ${user.readNotifications ? "bg-gray-400 " : "bg-gray-800 "}`}
        >
          <button
            onClick={handleMarkAllAsRead}
            className={`${mode ? "text-white" : ""}`}
          >
            Mark all as Read
          </button>
        </h1>

        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notif) => (
            <div
              className={`flex justify-between border-t border-b p-3 items-center ${
                mode ? "text-white" : ""
              }  ${notif.read ? "" : "bg-gray-600"}`}
            >
              <div
                key={notif._id}
                className={`notification ${
                  notif.read ? "read" : ""
                } flex items-center space-x-4`}
              >
                <a href={`/users/${notif.name}`}>
                  <img
                    src={notif.image}
                    alt="User Profile"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </a>

                {notif.postUrl ? (
                  <div>
                    <a href={`/posts/${notif.postUrl}`}>
                      <button>
                        <p className={`${mode ? "text-black" : "text-white"}`}>
                          {notif.msg}
                        </p>
                      </button>
                    </a>
                    <h1>{formatTimeAgo(notif.createdAt)}</h1>
                  </div>
                ) : (
                  <div>
                    <a href={`/users/${notif.name}`}>
                      <button>
                        <p className={`${mode ? "text-black" : "text-white"}`}>
                          {notif.msg}
                        </p>
                      </button>
                    </a>
                    <h1>{formatTimeAgo(notif.createdAt)}</h1>
                  </div>
                )}
              </div>
              {notif.read ? (
                <h1 className={`${mode ? "text-black" : "text-white"}`}>
                  Read
                </h1>
              ) : (
                <div>
                  <button onClick={() => handleMarkAsRead(notif._id)}>
                    <CheckCircleIcon />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1
            className={`${mode ? "text-black" : "text-white"} py-3 text-center`}
          >
            No notifications
          </h1>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;
