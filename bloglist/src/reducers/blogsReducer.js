import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.likes - a.likes);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const addLikeTo = (id) => {
  return async (dispatch) => {
    const blogToChange = await blogsService.get({ blogId: id });
    const changedAnecdote = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };
    await blogsService.update(changedAnecdote);
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
