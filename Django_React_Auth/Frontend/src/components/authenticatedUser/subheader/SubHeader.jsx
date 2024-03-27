import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SubHeader = () => {
  const { user_id } = useSelector((state) => state.auth.userData);

  return (
    <div className="!sticky top-0 z-[49] flex w-full items-center justify-between border-b border-black/5 dark:border-white/20 bg-neutral-50/80 py-2 duration-300 text-sm backdrop-blur-sm dark:bg-zinc-950/90">
      <div
        className={`mx-auto flex w-full max-w-7xl justify-between bg-transparent px-4 delay-1000 duration-300`}
      >
        <div className="flex flex-row items-center justify-center gap-x-1 bg-transparent">
          <NavLink
            to={`/${user_id}/~`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={`/${user_id}/monitoring`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Monitoring
          </NavLink>
          <NavLink
            to={`/${user_id}/settings`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Usage
          </NavLink>
          <NavLink
            to={`/${user_id}/settings`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Storage
          </NavLink>
          <NavLink
            to={`/${user_id}/settings`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to={`/${user_id}/notifications`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Notifications
          </NavLink>
        </div>

        <div className="flex flex-row items-center justify-center gap-x-[1px]">
          <span
            className="text-2xl text-black/15 dark:text-white/15 dark:font-thin"
          >
            /
          </span>
        </div>

        <div className="flex flex-row items-center justify-center gap-x-[1px]">
          <NavLink
            to={`/${user_id}/account`}
            className={({ isActive }) =>
              `${isActive ? "bg-neutral-150 text-black dark:bg-white/5 dark:text-white" : "bg-transparent text-black/60 dark:text-white/60"} dark:hover:text-white dark:!font-normal dark:hover:bg-white/5 hover:bg-neutral-150 rounded-[4px] p-2.5 font-medium leading-none duration-300 hover:text-black`
            }
          >
            Account Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
