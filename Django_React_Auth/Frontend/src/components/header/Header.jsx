import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const userAuthenticated = false;

  return (
    <header className="sticky top-0 flex h-[80px] w-full items-center justify-center border-b border-black/5 bg-transparent px-4 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center ">
          <Link
            to={"/--⁕"}
            className="font-serif text-4xl font-extrabold leading-none"
          >
            Authenticate
          </Link>
        </div>
        <nav className="flex items-center justify-center gap-x-2">
          <div className="flex items-center justify-center gap-x-[2px]">
            <NavLink
              to={"/--⁕"}
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200 text-black" : "bg-transparent text-gray-500"} rounded-[4px] p-[8px_20px] font-poppins text-[13px] font-medium leading-none duration-300 hover:bg-gray-200 hover:text-black `
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/services--⁕"}
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200 text-black" : "bg-transparent text-gray-500"} rounded-[4px] p-[8px_20px] font-poppins text-[13px] font-medium leading-none duration-300 hover:bg-gray-200 hover:text-black `
              }
            >
              Services
            </NavLink>
            <NavLink
              to={"/about--⁕"}
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200 text-black" : "bg-transparent text-gray-500"} rounded-[4px] p-[8px_20px] font-poppins text-[13px] font-medium leading-none duration-300 hover:bg-gray-200 hover:text-black `
              }
            >
              About
            </NavLink>
            <NavLink
              to={"/contact--⁕"}
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200 text-black" : "bg-transparent text-gray-500"} rounded-[4px] p-[8px_20px] font-poppins text-[13px] font-medium leading-none duration-300 hover:bg-gray-200 hover:text-black `
              }
            >
              Contact
            </NavLink>
            {userAuthenticated ? (
              <NavLink
                to={"/test--⁕"}
                className={({ isActive }) =>
                  `${isActive ? "bg-gray-200 text-black" : "bg-transparent text-gray-500"} rounded-[4px] p-[8px_20px] font-poppins text-[13px] font-medium leading-none duration-300 hover:bg-gray-200 hover:text-black `
                }
              >
                Test
              </NavLink>
            ) : undefined}
          </div>
          {userAuthenticated ? (
            <div className="flex items-center justify-center gap-1">
              <NavLink
                to={"/signout--⁕"}
                className={({ isActive }) =>
                  ` ${isActive ? "bg-black text-white" : "bg-transparent text-black"} rounded-[4px] border border-black/5 p-[12px_32px] font-poppins text-sm leading-none duration-300 hover:bg-black hover:text-white`
                }
              >
                Signout
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <NavLink
                to={"/signin--⁕"}
                className={({ isActive }) =>
                  ` ${isActive ? "bg-black text-white" : "bg-transparent text-black"} rounded-[4px] border border-black/5 p-[12px_32px] font-poppins text-sm leading-none duration-300 hover:bg-black hover:text-white`
                }
              >
                Sign in
              </NavLink>
              <NavLink
                to={"/signup--⁕"}
                className={({ isActive }) =>
                  `${isActive ? "bg-black text-white" : "bg-transparent text-black"} rounded-[4px] border border-black/5 p-[12px_32px] font-poppins text-sm leading-none duration-300 hover:bg-black hover:text-white`
                }
              >
                Sign up
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
