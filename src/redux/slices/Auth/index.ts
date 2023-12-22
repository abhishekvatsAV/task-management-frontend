import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const getUser = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const user: UserType = JSON.parse(data);
    return user;
  }
  return null;
};

const initialState = {
  user: getUser(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
