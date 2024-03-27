import { Outlet } from "react-router-dom";
import { Footer, Header } from "..";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

export const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("PrivateRoute :: isAuthenticated :: ", isAuthenticated);

  return (
    <>
      <Header />

      <main className="bg-red-5 relative flex min-h-[calc(100%_-_8rem)] w-full justify-center">
        <Outlet />
        <Toaster
          richColors
          duration={5000}
          toastOptions={{
            style: {
              background: "rgba(250,250,250,0.8)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(0,0,0,0.05)",
              fontFamily: "Poppins",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              fontSize: "12px",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
};
