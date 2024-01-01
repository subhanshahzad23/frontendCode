import React, { useState, useEffect } from "react";

import ChatbotComponent from "./containers/chatbot";
import VerifyComponent from "./containers/verifyEmail";
import AdminPanel from "./containers/pages/adminPanel";
import LoginPage from "./containers/pages/login";
import { useAuth } from "./context/AuthContext";
import CardComponent from "./containers/CardComponent";
import Form from "./containers/pages/Form";
import Temp from "./components/Temp";
import fetchMessagesForChatBot from "./fetchMessages";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<ChatbotComponent />}
        loader={fetchMessagesForChatBot}
      />
      <Route path="/verify-email" element={<VerifyComponent />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/card" element={<CardComponent />} />
      <Route path="/admin1" element={<Temp />} />
      <Route path="/admin" element={<Form />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
    </Route>
  )
);
const PublicRoutes = () => {
  // const { isAuthenticated } = useAuth();

  // const RestrictedRoute = ({ element: Component, ...rest }) => {
  //   return isAuthenticated ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" replace state={{ from: rest.location }} />
  //   );
  // };

  return <RouterProvider router={router} />;
};

export default PublicRoutes;
