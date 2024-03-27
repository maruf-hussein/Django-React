import { signoutUser } from "../../toolkit/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const UserInfo = ({ signOutBtnRef, setUserInfoPopup, handleToggleTheme, currentTheme, }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    // const res = await dispatch(signoutUser())
    dispatch(signoutUser()).then((res) => {
      console.log("UserInfo :: Signout :: (response) :", typeof res);
    });
    navigate("/signin");
    // console.log("UserInfo :: SignOut-PopUp :: Btn clicked...");
  };

  return (
    //UserInfo.jsx
    <div className="z-50 flex min-w-64 flex-col gap-y-[2px] bg-transparent text-sm font-medium">
      <div className="">
        <div className="flex w-full items-center px-4 pb-4">
          <img
            className="size-20 rounded-full"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=100&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User photo"
          />
        </div>
        <div>
          <div className="w-full px-4 py-1 leading-none text-black dark:text-white duration-300">
            {userData && userData.name}
          </div>
          <div className="w-full px-4 py-1 leading-none text-black/60 dark:text-white/60 duration-300">
            {userData && userData.email}
          </div>
        </div>
      </div>

      <div className="w-full px-4">
        <div className="mx-auto my-2 h-[1px] bg-black/10 dark:bg-white/10"></div>
      </div>

      <div className="w-full">
        <Link onClick={() => setUserInfoPopup(false)} to={`/${userData.user_id}/account`}
          className="w-full relative flex items-center justify-between cursor-pointer px-4 py-3 leading-none text-black/60 duration-300 hover:bg-neutral-150 hover:text-black dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 ">
          <div>
            Account Settings
          </div>
          <div className="absolute right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

          </div>
        </Link>
      </div>

      <div className="w-full px-4">
        <div className="mx-auto my-2 h-[1px] bg-black/10 dark:bg-white/10"></div>
      </div>

      {/* ---Theme--- */}
      <div className="w-full relative cursor-pointer"
        onClick={() => handleToggleTheme()}>
        <div
          className="w-full relative flex items-center justify-between cursor-pointer px-4 py-3 leading-none text-black/60 duration-300 hover:bg-neutral-150 hover:text-black dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 ">
          <div className="w-full leading-none duration-300">
            <span>Theme</span>
          </div>

          <div
            className={`absolute right-4 rounded-full flex items-center justify-center`}>
            <div className="flex items-center justify-center">
              {
                currentTheme === "dark" ?
                  <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-[18px] pointer-events-none"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-[20px] pointer-events-none"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
              }
            </div>
          </div>

        </div>
      </div>

      <div className="w-full px-4">
        <div className="mx-auto my-2 h-[1px] bg-black/10 dark:bg-white/10"></div>
      </div>

      <div className="px-4 mt-3">
        <button
          ref={signOutBtnRef}
          className="w-full rounded-md bg-black px-4 py-3 text-center leading-none text-white duration-300 dark:bg-white dark:text-black dark:hover:bg-white/80 hover:bg-black/80"
          onClick={handleSignOut}
        >
          Signout
        </button>
      </div>
    </div >
  );
};

export default UserInfo;
