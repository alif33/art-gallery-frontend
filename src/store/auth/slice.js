import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isUser: false,
  },
  reducers: {
    LogedIn: (state, action) => {
      return {
        ...state,
        isUser: true,
        token: action.payload.token
      };
    },

    LogedOut: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        token: ""
      };
    },
  },
});