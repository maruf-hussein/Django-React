import { Outlet } from "react-router-dom";
import { Footer, Header } from "..";
import { Toaster } from "sonner";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-red-40 flex min-h-[calc(100%_-_160px)] w-full justify-center">
        <Outlet />
        <Toaster
          duration={5000}
          toastOptions={{
            style: {
              background: "transparent",
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
