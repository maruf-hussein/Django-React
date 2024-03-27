import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { UserInfo } from "..";

const Header = () => {
  const [userInfoPopup, setUserInfoPopup] = useState(false);
  const { userData, isAuthenticated } = useSelector((state) => state.auth);
  const userInfoPopupRef = useRef();
  const userInfoPopupBtnRef = useRef();
  const signOutBtnRef = useRef();
  // const [currentTheme, setCurrentTheme] = useState(localStorage.getItem(""))
  const [currentTheme, setCurrentTheme] = useState("");
  // screen media query
  const [navbarActive, setNavbarActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (userInfoPopupRef.current &&
          !userInfoPopupRef.current.contains(event.target) &&
          !userInfoPopupBtnRef.current.contains(event.target)) ||
        !isAuthenticated
      ) {
        setUserInfoPopup(false);
      }
    };

    // Add event listener when userInfoPopup is open
    if (userInfoPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when userInfoPopup is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userInfoPopup, isAuthenticated]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, []);

  // const handleToggleTheme = () => {
  //   setCurrentTheme(currentTheme === "dark" ? "light" : "dark")
  //   // document.documentElement.classList.toggle("dark")
  // }

  // useEffect(() => {
  //   if (currentTheme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.add("light");
  //   }
  // }, [currentTheme, setCurrentTheme])

  return (
    // Header.jsx
    <>
      <header
        className={`${
          isAuthenticated
            ? "sticky dark:bg-zinc-950/90"
            : "sticky top-0 border-b dark:border-white/10 dark:bg-black/80"
        } z-50 flex h-16 w-full flex-col items-center justify-center border-black/5 max-xl:border-black/15 dark:text-white !duration-300 bg-neutral-50/80 px-4 !backdrop-blur-sm`}
        // className={`${isAuthenticated ? "border-b" : "border-none"} sticky top-0 z-[1000] flex w-full flex-col items-center justify-center border-black/5 bg-neutral-50/80 px-4 backdrop-blur-sm`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center max-xl:relative">
            <Link
              to={isAuthenticated ? `/${userData.user_id}/~` : "/"}
              className="flex items-center justify-center"
            >
              <div className="flex items-center justify-center font-serif text-4xl font-extrabold leading-none max-sm:text-3xl">
                <span>{isAuthenticated ? "Auth" : "Authenticate"}</span>
              </div>

              {isAuthenticated && (
                <>
                  <span className="mx-2 text-3xl dark:text-white/15 dark:font-thin text-black/15">
                    /
                  </span>
                  <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 leading-none">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=100&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User Image"
                      className="size-6 rounded-full"
                    />
                    <span className="text-sm font-medium dark:text-white text-black">
                      {userData.name}
                    </span>
                  </div>
                </>
              )}
            </Link>
          </div>
          {/* --- Hamburger --- */}
          <div className="xl:hidden">
            <div
              onClick={() => setNavbarActive(!navbarActive)}
              className={`flex items-center justify-center size-9 rounded-full bg-red-5 border cursor-pointer border-black/15`}
            >
              {navbarActive ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* --- Navbar --- */}
          <nav
            className={`flex items-center justify-center overflow-hidden ${
              isAuthenticated ? "gap-x-3" : "gap-x-2"
            } max-xl:bg-neutral-50 max-xl:absolute max-xl:!z-[49] max-xl:top-[64px] max-xl:h-screen max-xl:origin-top max-xl:inset-0 max-xl:w-full max-xl:flex-col max-xl:justify-start max-xl:items-start max-xl:duration-300 max-xl:border-black/15 ${
              navbarActive
                ? // ? "max-xl:scale-100 max-xl:opacity-100 pointer-events-auto"
                  "max-xl:scale-100 max-xl:opacity-100 max-xl:pointer-events-auto"
                : // : "max-xl:scale-95 max-xl:opacity-0 pointer-events-none"
                  "max-xl:scale-95 max-xl:opacity-0 max-xl:pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-center max-xl:flex-col max-xl:w-full gap-2 ">
              <div
                className={`mt-[1px] flex items-center max-xl:p-2 max-xl:pb-0 justify-center gap-x-[1px] max-xl:justify-start max-xl:w-full max-xl:flex-col max-xl:backdrop-blur-sm`}
              >
                {!isAuthenticated ? (
                  <>
                    <NavLink
                      to={"/"}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-lg xl:rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black max-xl:block max-xl:!w-full max-xl:text-start max-xl:!text-base max-xl:font-normal  `
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={"/services"}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-lg xl:rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black max-xl:block max-xl:!w-full max-xl:text-start max-xl:!text-base max-xl:font-normal  `
                      }
                    >
                      Services
                    </NavLink>
                    <NavLink
                      to={"/about"}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-lg xl:rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black max-xl:block max-xl:!w-full max-xl:text-start max-xl:!text-base max-xl:font-normal  `
                      }
                    >
                      About
                    </NavLink>
                    <NavLink
                      to={"/contact"}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-lg xl:rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black max-xl:block max-xl:!w-full max-xl:text-start max-xl:!text-base max-xl:font-normal  `
                      }
                    >
                      Contact
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to={`/${userData && userData.user_id}/todos`}
                      // to={`/todos`}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white/60 text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black`
                      }
                    >
                      Docs
                    </NavLink>
                    <NavLink
                      to={`/${userData && userData.user_id}/feedback`}
                      // to={`/dashboard`}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white/60 text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black`
                      }
                    >
                      Feedback
                    </NavLink>
                    <NavLink
                      to={`/${userData && userData.user_id}/test`}
                      // to={`/test`}
                      onClick={() => setNavbarActive(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-neutral-150 text-black dark:text-white dark:bg-white/5"
                            : "bg-transparent dark:text-white/60 text-black/60"
                        } dark:hover:bg-white/5 dark:hover:text-white hover:bg-neutral-150 rounded-full px-4 py-2 text-sm font-medium leading-none duration-300 hover:text-black`
                      }
                    >
                      Help
                    </NavLink>
                  </>
                )}
              </div>

              {isAuthenticated ? (
                <div className="relative flex items-center justify-center gap-[1px]">
                  <div
                    ref={userInfoPopupBtnRef}
                    className={`${
                      userInfoPopup
                        ? "dark:border-white/50"
                        : "border-black/50 dark:border-white/15"
                    } size-7 border-1 duration-300 dark:hover:border-white/50 border-black/10 overflow-hidden flex w-fit cursor-pointer items-center justify-between rounded-full leading-none`}
                    onClick={() => setUserInfoPopup(!userInfoPopup)}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=100&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="user photo"
                      className="size-full"
                    />
                  </div>

                  {/* ---UserInfo */}
                  <div
                    className={`${
                      userInfoPopup
                        ? "pointer-events-auto scale-100 opacity-100"
                        : "pointer-events-none scale-95 opacity-0"
                    } absolute right-0 top-[calc(100%_+_8px)] z-[2000] w-fit min-w-max origin-top-right overflow-hidden rounded-xl dark:border-white/10 dark:bg-zinc-950 border border-black/5 bg-zinc-50 py-4 shadow-[0_1px_16px_rgba(0,0,0,0.05)] backdrop-blur-3xl duration-200 ease-just-bounce before:absolute before:right-0 before:top-0 before:-mr-12 before:-mt-12 before:size-24 before:animate-spin before:bg-cyan-500 before:blur-[88px] before:content-[""]`}
                    // className={`${userInfoPopup ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute right-0 top-[calc(100%_+_8px)] z-[2000] w-fit min-w-max origin-top-right overflow-hidden rounded-xl border border-black/5 bg-zinc-50 py-4 shadow-[0_1px_16px_rgba(0,0,0,0.05)] backdrop-blur-3xl duration-200 ease-just-bounce before:absolute before:right-0 before:top-0 before:-mr-16 before:-mt-16 before:size-32 before:animate-spin before:bg-cyan-500 before:blur-[88px] before:content-[""]`}
                    ref={userInfoPopupRef}
                  >
                    <UserInfo
                      currentTheme={currentTheme}
                      setCurrentTheme={setCurrentTheme}
                      setUserInfoPopup={setUserInfoPopup}
                      signOutBtnRef={signOutBtnRef}
                    />
                    {/* <UserInfo handleToggleTheme={handleToggleTheme} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} setUserInfoPopup={setUserInfoPopup} signOutBtnRef={signOutBtnRef} /> */}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-2 max-xl:gap-y-2 max-xl:w-full max-xl:flex-col max-xl:pt-0 max-xl:p-2">
                  <NavLink
                    to={"/signin"}
                    onClick={() => setNavbarActive(false)}
                    className={`rounded-lg border border-black/5 bg-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 px-4 py-2 xl:!py-2.5 text-sm font-medium leading-none hover:bg-gray-100 max-xl:block max-xl:w-full max-xl:text-base max-xl:!border-black/15 max-xl:font-normal `}
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    onClick={() => setNavbarActive(false)}
                    className={`rounded-lg border border-black/5 bg-black px-4 py-2 xl:!py-2.5 text-sm font-medium dark:bg-white dark:hover:bg-white/85 dark:text-black dark:border-white leading-none text-white hover:bg-black/85 duration-300 max-xl:block max-xl:w-full max-xl:text-base max-xl:!border-black max-xl:font-normal `}
                  >
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
