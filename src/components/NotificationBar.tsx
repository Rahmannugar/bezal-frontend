import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { addNotification, markNotificationRead, markNotificationsRead } from "../states/userSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Notification = {
  _id: string;
  msg: string;
  read: boolean;
  image: string;
  postUrl?: string;
  name: string;
  createdAt: Date;
};

const NotificationBar = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:8080", {
    withCredentials: true,
  });

  const mode = useSelector((state: RootState) => state.user.mode);
  const notifications = useSelector(
    (state: RootState) => state.user.user.notifications
  );
  const [realTimeNotifications, setRealTimeNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    // Listen for real-time notifications
    socket.on("newNotification", (data: Notification) => {
      setRealTimeNotifications((prevNotifications) => [
        ...prevNotifications,
        data,
      ]);
      dispatch(addNotification(data)); // Persist the notification in Redux
    });

    return () => {
      socket.off("newNotification");
    };
  }, [dispatch, socket]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markNotificationRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markNotificationsRead());
  };

  return (
    <div>
      <div
        className={`${
          mode ? "bg-white text-black" : "bg-transparent text-white border"
        }  min-w-[600px] w-[50vw] max-w-[100%] rounded-[20px] mt-10 shadow-md`}
      >
        <h1 className="text-center py-3 rounded-t-[20px] bg-gray-400 hover:bg-gray-800">
          <button onClick={handleMarkAllAsRead}>Mark all as Read</button>
        </h1>

        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div className="flex justify-between border-t border-b p-3 items-center">
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
                  <a href={`/posts/${notif.postUrl}`}>
                    <button>
                      <p>{notif.msg}</p>
                    </button>
                  </a>
                ) : (
                  <a href={`/users/${notif.name}`}>
                    <button>
                      <p>{notif.msg}</p>
                    </button>
                  </a>
                )}
              </div>
              {notif.read ? (
                <h1>Read</h1>
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
          <h1 className={`${mode ? "text-black" : "text-white"} `}></h1>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;
