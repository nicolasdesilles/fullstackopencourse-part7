import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../reducers/loggedUserReducer";

const LoginForm = () => {
  //dispatch
  const dispatch = useDispatch();

  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //submit handler func
  const onSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      login({
        username: username,
        password: password,
      })
    );

    setUsername("");
    setPassword("");

    // Remove the immediate navigation - let the router handle it based on state
  };

  return (
    <div className="h-dvh flex items-center justify-center">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            className="btn btn-accent"
            type="submit"
            data-testid="login-button"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
