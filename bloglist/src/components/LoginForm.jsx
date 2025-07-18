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
    <div>
      <div class="flex justify-center">
        <div class="card bg-base-200 w-96 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            <form onSubmit={onSubmit}>
              <div>
                <legend class="fieldset-legend">Username</legend>
                <input
                  class="input"
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                <legend class="fieldset-legend">Password</legend>
                <input
                  class="input"
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div class="card-actions justify-end pt-4 ">
                <button
                  class="btn btn-primary"
                  type="submit"
                  data-testid="login-button"
                >
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
