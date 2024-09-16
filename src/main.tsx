import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./utils/routes.ts";
import FiveDaysForecast from "./pages/five-days-forecast.jsx";
import App from "./App.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: Routes.home,
    element: <App />,
  },
  {
    path: Routes.fiveDaysForecast,
    element: <FiveDaysForecast />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
