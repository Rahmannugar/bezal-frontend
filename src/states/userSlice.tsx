import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { setUser, resetUser, setMode } = userSlice.actions;
export default userSlice.reducer;
