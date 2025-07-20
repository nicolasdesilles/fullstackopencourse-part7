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

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow-md"
          >
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          Blogs App
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex prose">
        {loggedUser ? (
          <div className="flex gap-4 items-center">
            <div>
              <em>
                User <b>{loggedUser.name}</b> is logged in
              </em>
            </div>
            <div>
              <button className="btn btn-accent" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login">Login Page</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
