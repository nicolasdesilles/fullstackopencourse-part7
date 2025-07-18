import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "./reducers/loggedUserReducer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Notification from "./components/Notification";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Blog from "./components/Blog";
import Header from "./components/Header";

const App = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  //effect
  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getLoggedInUser());
      setIsInitialized(true);
    };
    initializeApp();
  }, [dispatch]);

  //Redux
  const notification = useSelector((state) => state.notification);
  const loggedUser = useSelector((state) => state.loggedUser);

  //console.log("App rendered, loggedUser:", loggedUser, "isInitialized:", isInitialized);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Notification type={notification.type} />

      {loggedUser ? <Header /> : ""}

      <Router>
        <Routes>
          <Route
            path="/login"
            element={loggedUser ? <Navigate replace to="/" /> : <LoginForm />}
          />
          <Route
            path="/"
            element={loggedUser ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/blogs"
            element={loggedUser ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/users"
            element={
              loggedUser ? <UsersList /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
