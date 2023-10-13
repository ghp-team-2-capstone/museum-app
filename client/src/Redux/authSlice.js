import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: {
    username: null,
    userId: null,
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const payload = action.payload;
      state.username = payload.username;
      state.userId = payload.userId;
      state.token = payload.token;
      if (action.payload.isLoggedIn !== undefined) {
        state.isLoggedIn = action.payload.isLoggedIn;
      } else {
        state.isLoggedIn = true; // Set isLoggedIn to true by default
      }
      console.log("payload", payload);
    },
    logOut: (state) => {
      state.username = null;
      state.userId = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state) => state.authenticate.username;
export const selectCurrentUserId = (state) => state.authenticate.userId;

export const selectCurrentToken = (state) => state.authenticate.token;

export const selectIsLoggedIn = (state) => state.authenticate.isLoggedIn;
