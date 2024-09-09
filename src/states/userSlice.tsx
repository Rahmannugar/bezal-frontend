import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  _id: string;
  msg: string;
  read: boolean;
  image: string;
  postUrl?: string;
  name: string;
  createdAt: Date;
}

export interface UserState {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    location: string;
    profileImage: string;
    coverImage: string;
    email: string;
    bio: string;
    dateOfBirth: string;
    isDatePublic: boolean;
    userPosts: string[];
    userFollowers: string[];
    userFollows: string[];
    likes: Record<string, boolean>;
    dislikes: Record<string, boolean>;
    comments: string[];
    notifications: Notification[];
    readNotifications: boolean;
  };
  isLoggedIn: boolean;
  mode: boolean;
}

const initialState: UserState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
    location: "",
    profileImage: "",
    coverImage: "",
    email: "",
    bio: "",
    dateOfBirth: "",
    isDatePublic: false,
    userPosts: [],
    userFollowers: [],
    userFollows: [],
    likes: {},
    dislikes: {},
    comments: [],
    notifications: [],
    readNotifications: true,
  },
  isLoggedIn: false,
  mode: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    resetUser(state) {
      state.user = initialState.user;
      state.isLoggedIn = false;
    },
    setMode(state) {
      state.mode = !state.mode;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.user.notifications.push(action.payload);
    },

    // Mark notifications as read
    markNotificationRead(state, action: PayloadAction<string>) {
      state.user.notifications = state.user.notifications.map((notification) =>
        notification._id === action.payload
          ? { ...notification, read: true }
          : notification
      );
    },
    markNotificationsRead(state) {
      state.user.readNotifications = true;
      state.user.notifications = state.user.notifications.map(
        (notification) => ({
          ...notification,
          read: true,
        })
      );
    },
  },
});

export const {
  setUser,
  resetUser,
  setMode,
  addNotification,
  markNotificationRead,
  markNotificationsRead,
} = userSlice.actions;
export default userSlice.reducer;
