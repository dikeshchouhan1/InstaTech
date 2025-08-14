import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  suggestedUsers: null,
  profileData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setUserData, setSuggestedUsers, setProfileData } = userSlice.actions;
export default userSlice.reducer;
