import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

type Notification = {
  _id: string;
  msg: string;
  read: boolean;
  image: string;
};

const NotificationBar = () => {
  const socket = io("http://localhost:8080", {
    withCredentials: true,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    // Listen for real-time notifications
    socket.on("newNotification", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });
    console.log(notifications);

    return () => {
      socket.off("newNotification");
    };
  }, []);
  return (
    <div>
      <div className="text-white">
        {notifications.map((notif) => (
          <div
            key={notif._id}
            className={`notification ${notif.read ? "read" : ""}`}
          >
            <img src={notif.image} alt="User Profile" />
            <p>{notif.msg}</p>
            <button>Mark as Read</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationBar;
