import { createRoot } from "react-dom/client";
import Posts from "./pages/Posts/Posts.tsx";
import Login from "./pages/Login/Login.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";
import Register from "./pages/Register/Register.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user/:id",
    element: <UserPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>,
);
