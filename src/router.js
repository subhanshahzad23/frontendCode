import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import ChatbotComponent from "./containers/chatbot";
import VerifyComponent from "./containers/verifyEmail";
import AdminPanel from "./containers/pages/adminPanel";
import LoginPage from "./containers/pages/login";
import { useAuth } from "./context/AuthContext";
import CardComponent from "./containers/CardComponent";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  const RestrictedRoute = ({ element: Component, ...rest }) => {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace state={{ from: rest.location }} />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatbotComponent />} />
        <Route path="/verify-email" element={<VerifyComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/card" element={<CardComponent />} />

        <Route element={<RestrictedRoute />}>
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default PublicRoutes;
