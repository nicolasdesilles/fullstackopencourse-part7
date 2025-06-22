import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../reducers/userReducer";

const LoginForm = () => {
  //dispatch
  const dispatch = useDispatch();

  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //submit handler func
  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      login({
        username: username,
        password: password,
      })
    );

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-testid="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
