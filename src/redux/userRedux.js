import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.currentUser=null;
      state.errorMessage = ''
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = true;
      state.errorMessage= action.payload
    },
    clearState: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
      state.errorMessage= ''
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, clearState } = userSlice.actions;
export default userSlice.reducer;
