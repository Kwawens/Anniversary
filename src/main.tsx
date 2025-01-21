import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Flower from "./Flower.tsx";

const router = createBrowserRouter([
  {
    path: "/Valentines/",
    element: <App />,
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/Valentines/flower",
    element: <Flower />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
