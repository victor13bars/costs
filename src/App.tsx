import React from "react";
import { Header } from "./components/header/Header";
import { AuthPage } from "./components/authPage/AuthPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useStore } from "effector-react";
import { $auth } from "./context/auth";
import { $alert } from "./context/alert";
import { Alert } from "./components/alert/Alert";
import { Costs } from "./components/costsPage/Costs";

export const App = () => {
  const isLoggedIn = useStore($auth);
  const alert = useStore($alert);

  return (
    <div className="App">
      <Header />
      {alert.alertText && <Alert props={alert} />}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to={"/costs"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/registration"
            element={
              isLoggedIn ? (
                <Navigate to={"costs"} />
              ) : (
                <AuthPage type="registration" />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to={"costs"} /> : <AuthPage type="login" />
            }
          />
          <Route
            path="/costs"
            element={isLoggedIn ? <Costs /> : <Navigate to={"login"} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
