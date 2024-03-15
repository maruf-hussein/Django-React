import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Dashboard,
  Home,
  Layout,
  NotAuthenticated,
  PrivateLayout,
  Services,
  Signin,
  Signout,
  Signup,
  Test,
} from "./components";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/--⁕",
          element: <Home />,
        },
        {
          path: "/services--⁕",
          element: <Services />,
        },
        {
          path: "/about--⁕",
          element: <About />,
        },
        {
          path: "/contact--⁕",
          element: <Contact />,
        },
        {
          path: "/signup--⁕",
          element: <Signup />,
        },
        {
          path: "/signin--⁕",
          element: <Signin />,
        },
        {
          path: "/not-authenticated--⁕",
          element: <NotAuthenticated />,
        },
      ],
    },
    {
      element: <PrivateLayout />,
      children: [
        {
          path: "/test--⁕",
          element: <Test />,
        },
        {
          path: "/dashboard--⁕",
          element: <Dashboard />,
        },
        {
          path: "/signout--⁕",
          element: <Signout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
