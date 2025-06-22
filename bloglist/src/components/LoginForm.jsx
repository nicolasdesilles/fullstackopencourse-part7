import { useState } from "react";

const LoginForm = ({ attemptLogin }) => {
  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //submit handler func
  const onSubmit = (event) => {
    event.preventDefault();

    attemptLogin({
      username: username,
      password: password,
    });

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
            data-testid="login-username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            data-testid="login-password"
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
