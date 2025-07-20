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
    <div className="m-8 prose grid grid-cols-1 gap-4">
      <Togglable buttonLabel="Create new blog" ref={createNewBlogFormRef}>
        <BlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default Home;
