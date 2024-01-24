import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import Terms from "@/pages/terms";
import Stay from "@/pages/stay";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/stay/:id_property",
      element: <Stay />,
    },
    {
      path: "/terms",
      element: <Terms />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
