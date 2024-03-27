import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {
  About,
  Account,
  Contact,
  DashboardHome,
  DashboardLayout,
  Home,
  Layout,
  Monitoring,
  NotAuthenticated,
  Notifications,
  PrivateRoute,
  Services,
  Settings,
  Signin,
  Signup,
  Test,
  Todos,
} from "./components";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, userData } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        {
          path: "/",
          element: isAuthenticated ? (
            <Navigate to={`/${userData.user_id}/~`} />
          ) : (
            <Home />
          ),
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/signup",
          element: isAuthenticated ? (
            <Navigate to={`/${userData.user_id}/~`} />
          ) : (
            <Signup />
          ),
        },
        {
          path: "/signin",
          element: isAuthenticated ? (
            <Navigate to={`/${userData.user_id}/~`} />
          ) : (
            <Signin />
          ),
        },
        {
          path: "/not-authenticated",
          element: <NotAuthenticated />,
        },
        {
          path: `/:userId/`,
          element: (
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          ),
          children: [
            {
              path: "~",
              // index,
              element: <DashboardHome />,
            },
            {
              path: "monitoring",
              element: <Monitoring />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "Settings",
              element: <Settings />,
            },
            {
              path: "account",
              element: <Account />,
            },
          ],
        },
        {
          path: `/:userId/todos`,
          // path: `/todos`,
          element: (
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          ),
        },
        {
          path: `/:userId/test`,
          // path: `/test`,
          element: (
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
