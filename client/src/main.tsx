import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Uploader } from "./components/Uploader/Uploader.tsx";
import { FileExplorer } from "./components/FileExplorer/FileExplorer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <FileExplorer />
      </App>
    ),
  },
  {
    path: "/upload",
    element: (
      <App>
        <Uploader />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
