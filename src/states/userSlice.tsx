import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  firstName: string;
  lastName: string;
  userName: string;
  location: string;
  profileImage: string;
  coverImage: string;
  email: string;
  password: string;
  userPosts: string[];
  userFollowers: string[];
  userFollows: string[];
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  userName: "",
  location: "",
  profileImage: "",
  coverImage: "",
  email: "",
  password: "",
  userPosts: [],
  userFollowers: [],
  userFollows: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    updateUserState(state, action: PayloadAction<Partial<UserState>>) {
      return { ...state, ...action.payload };
    },
    resetUserState() {
      return initialState;
    },
  },
});

export const { setUserState, updateUserState, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;
