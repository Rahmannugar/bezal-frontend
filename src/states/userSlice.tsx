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
    bio: string;
    dateOfBirth: Date | null;
    userPosts: string[];
    userFollowers: string[];
    userFollows: string[];
  };
  isLoggedIn: boolean;
  mode: boolean;
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
    bio: "",
    dateOfBirth: null,
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
