import React, { useState } from "react";
import { loginUser } from "../../helpers/fetching";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/authSlice";
import { fetchFavoritesByUserId } from "../../helpers/fetching";
import { setFavorites } from "../../Redux/favoriteSlice";
import MessageAlert from "./MessageAlert";
import "./JournalEntries.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const checkCredentials = async (username, password) => {
    try {
      const validUser = await loginUser(username, password);
      console.log("valid user", validUser);
      return validUser;
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid = async () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = "Please enter a valid username or register an account.";
    }

    if (!password.trim()) {
      errors.password = "Password required.";
    }

    const validUser = await checkCredentials(username, password);
    if (!validUser) {
      errors.invalidUser = "Invalid username or password. Please try again.";
    } else {
      delete errors.invalidUser;
    }
    if (!validUser) {
      errors.invalidUser = "Incorrect login credentials, please try again.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const loginResult = await loginUser(username, password);

      if (loginResult && loginResult.user) {
        dispatch(
          setCredentials({
            username: loginResult.user.username,
            userId: loginResult.user.userId,
            token: loginResult.token,
            isLoggedIn: true,
          })
        );
        const myFavorites = await fetchFavoritesByUserId(
          loginResult.user.userId
        );

        // Dispatch setFavorites action to update favorites in Redux store
        dispatch(setFavorites(myFavorites));
        setError({});
        setSuccessMessage("You have logged in!");
        nav("/map");
      } else {
        setError({
          general: "Invalid username or password. Please try again.",
        });
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="app-description-container">
          <p className="app-description-text">
            Welcome! Join our community of museum enthusiasts as you search,
            review, and rate museums. Save your most cherished experiences with
            your favorite museums and keep a personalized journal of your
            visits, capturing the exhibits that left a lasting impression.
          </p>
        </div>
      </div>

      <div className="form-container">
        <div className="login-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <MessageAlert
              usernameError={error.username}
              passwordError={error.password}
              generalError={error.general}
              invalidUserError={error.invalidUser}
              successMessage={successMessage}
              type="error"
              onClose={() =>
                setError({
                  ...error,
                  username: "",
                  password: "",
                  general: "",
                })
              }
            />
            <input
              autoFocus
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Submit</button>
          </form>
          <button className="link-button" onClick={() => nav("/register")}>
            Don't have an account? Register here.
          </button>
        </div>
      </div>
    </div>
  );
}
