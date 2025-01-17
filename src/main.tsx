import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "./index.css";
import Home from "./pages/Home";
import Origins from "./pages/Origins";
import Login from "./pages/Login";

const Main: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Origins" element={<Origins />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
