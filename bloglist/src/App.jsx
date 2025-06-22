import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./reducers/blogsReducer";
import { getLoggedInUser, logout } from "./reducers/userReducer";

import Notification from "./components/Notification";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

import Togglable from "./components/Togglable";

const App = () => {
  //dispatch
  const dispatch = useDispatch();

  //effect
  useEffect(() => {
    dispatch(initializeBlogs());
  });

  useEffect(() => {
    getLoggedInUser();
  }, []);

  //Redux
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  //references
  const createNewBlogFormRef = useRef();

  //event handlers
  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logout(user));
  };

  //components rendering functions
  const renderLoginForm = () => {
    return (
      <div>
        <h2>log in to the app</h2>
        <LoginForm />
      </div>
    );
  };

  const renderBlogsList = () => {
    const logoutButtonStyle = {
      margin: "5px",
    };

    return (
      <div>
        <h1>blogs</h1>

        <div>
          <span>User {user.name} is logged in</span>
          <span style={logoutButtonStyle}>
            <button onClick={handleLogout}>logout</button>
          </span>
        </div>

        <Togglable buttonLabel="create new blog" ref={createNewBlogFormRef}>
          <h2>create a new blog entry</h2>

          <BlogForm />
        </Togglable>

        <h2>blogs list</h2>

        <BlogList />
      </div>
    );
  };

  return (
    <div>
      <Notification type={notification.type} />

      {user === null ? renderLoginForm() : renderBlogsList()}
    </div>
  );
};

export default App;
