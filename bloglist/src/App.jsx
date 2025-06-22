import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationsReducer";

import { initializeBlogs } from "./reducers/blogsReducer";

import Notification from "./components/Notification";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  //state
  const [user, setUser] = useState(null);

  //dispatch
  const dispatch = useDispatch();

  //effect
  useEffect(() => {
    dispatch(initializeBlogs());
  });

  //Redux
  const notification = useSelector((state) => state.notification);

  //references
  const createNewBlogFormRef = useRef();

  //event handlers
  const handleLogin = async ({ username, password }) => {
    console.log(
      `trying login with username = ${username} and password = ${password}`
    );

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);

      dispatch(
        setNotification(
          "success",
          `successfully logged in as ${user.username}`,
          4
        )
      );

      setUser(user);
    } catch (exception) {
      console.error("login failed: wrong credentials");
      dispatch(setNotification("error", "wrong userame or password", 2));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log(`logging out user ${user.name}`);
    window.localStorage.removeItem("loggedBloglistAppUser");
    setUser(null);

    dispatch(setNotification("success", "successfully logged out", 2));
  };

  //effect hooks
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  //components rendering functions
  const renderLoginForm = () => {
    return (
      <div data-testid="blogs-list">
        <h2>log in to the app</h2>
        <LoginForm attemptLogin={handleLogin} />
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
