import { configureStore } from "@reduxjs/toolkit";
import posts from "../slices/postSlice";

const store = configureStore({
  reducer: {
    posts,
  },
});

export default store;
