import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./pages/Layout";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ),
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
