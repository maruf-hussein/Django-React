import { useSelector } from "react-redux";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <footer
      className={` ${
        isAuthenticated ? "dark:bg-neutral-950/90" : "dark:!bg-black"
      } sticky duration-300 max-md:border-black/15 top-full flex h-16 w-full items-center justify-center border-t border-black/5 dark:border-white/10 bg-transparent backdrop-blur-sm`}
    >
      <div className="flex items-center justify-center">
        <span className="text-sm font-medium leading-none">
          © 2024 Authentication.com | All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
