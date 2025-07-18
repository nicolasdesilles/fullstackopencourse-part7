import { useDispatch, useSelector } from "react-redux";

import { logout } from "../reducers/loggedUserReducer";

import { Link } from "react-router-dom";

const NavigationBar = () => {
  //dispatch
  const dispatch = useDispatch();

  //Redux
  const loggedUser = useSelector((state) => state.loggedUser);

  //event handlers
  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logout(loggedUser));
  };

  const logoutButtonStyle = {
    margin: "5px",
  };

  const navLinksStyle = {
    margin: "5px",
  };

  const linkStyle = {
    margin: "10px",
  };

  const userLoggedInStyle = {
    margin: "20px",
  };

  const navBarStyle = {
    margin: "5px",
    background: "#dddddd",
  };

  return (
    <div>
      <div style={navBarStyle}>
        <span style={navLinksStyle}>
          <Link to="/blogs" style={linkStyle}>
            blogs
          </Link>
          <Link to="/users" style={linkStyle}>
            users
          </Link>
        </span>
        {loggedUser ? (
          <span style={userLoggedInStyle}>
            User {loggedUser.name} is logged in{" "}
            <span style={logoutButtonStyle}>
              <button onClick={handleLogout}>logout</button>
            </span>{" "}
          </span>
        ) : (
          <span>
            <Link to="/login">login</Link>
          </span>
        )}
      </div>
      <h1>blogs</h1>
    </div>
  );
};

export default NavigationBar;
