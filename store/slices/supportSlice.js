import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: {},
  search: "",
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    addsupport: (state, action) => {
      state.support = action.payload;
    },

    addSupportSearch: (state, action) => {
      state.search = action.payload?.toLowerCase();
    },
  },
});

export default supportSlice.reducer;
export const { addsupport, addSupportSearch } = supportSlice.actions;
