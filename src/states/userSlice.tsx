import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: object | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ user: UserState["user"]; token: string | null }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    resetUser() {
      return initialState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
