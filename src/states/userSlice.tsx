import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    location: string;
    profileImage: string;
    coverImage: string;
    email: string;
    userPosts: string[];
    userFollowers: string[];
    userFollows: string[];
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    userName: "",
    location: "",
    profileImage: "",
    coverImage: "",
    email: "",
    userPosts: [],
    userFollowers: [],
    userFollows: [],
  },
  isLoggedIn: false,
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
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
