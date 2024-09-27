import React from "react";
import { useTheme } from "../../hoooks";
import { $auth, $username } from "../../context/auth";
import { useStore } from "effector-react";
import { removeUser } from "../../utils/auth";
import "./styles.css";

export const Header = () => {
  const { theme, switchTheme } = useTheme();
  const username = useStore($username);
  const loggedIn = useStore($auth);

  return (
    <header
      className={`navbar navbar-dark bg-${
        theme === "dark" ? "dark" : "primary"
      }`}
    >
      <div className="container">
        <h1 style={{ color: "white" }}>My Costs</h1>
        {username.length ? <h2 style={{ color: "white" }}>{username}</h2> : ""}
        <button
          onClick={switchTheme}
          className={`btn btn-theme btn-${theme === "dark" ? "light" : "dark"}`}
        >
          {theme === "dark" ? "Go light" : "Go dark"}
        </button>
        {loggedIn && (
          <button onClick={removeUser} className="btn btn-logout btn-primary">
            Выход
          </button>
        )}
      </div>
    </header>
  );
};
