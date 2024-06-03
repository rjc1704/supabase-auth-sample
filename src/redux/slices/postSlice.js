import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = action.payload;
      state.push(newPost);
    },
    setPosts: (state, action) => {
      const newPosts = action.payload;
      return [...newPosts];
    },
  },
});

export const { addPost, setPosts } = postSlice.actions;
export default postSlice.reducer;
