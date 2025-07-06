import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { initializeBlogs } from "../reducers/blogsReducer";


import BlogForm from "./BlogForm";
import BlogList from "./BlogList";

import Togglable from "./Togglable";

const Home = () => {
  //dispatch
  const dispatch = useDispatch();

  //effect
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  //references
  const createNewBlogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={createNewBlogFormRef}>
        <h2>create a new blog entry</h2>

        <BlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default Home;
