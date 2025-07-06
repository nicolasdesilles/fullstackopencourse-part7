import { useDispatch, useSelector } from "react-redux";

import { logout } from "../reducers/loggedUserReducer";

const Header = () => {
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

  return (
    <div>
      <h1>blogs</h1>

      <div>
        <span>User {loggedUser.name} is logged in</span>
        <span style={logoutButtonStyle}>
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>
    </div>
  );
};

export default Header;
