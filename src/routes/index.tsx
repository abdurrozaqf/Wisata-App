import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import Stay from "@/pages/stay";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/stay/:property_id",
      element: <Stay />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
