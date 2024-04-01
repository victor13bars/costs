import React from "react";
import { Header } from "./components/header/Header";
import { AuthPage } from "./components/header/authPage/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage type="login" />} />
          <Route path="/registration" element={<AuthPage type="registration" />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/costs" element={<h1>Costs</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
