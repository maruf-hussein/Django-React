import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../toolkit/auth/actions";
import { Sidebar } from "../../index";
import { toast } from "sonner";

const Account = () => {
  const { userData } = useSelector((state) => state.auth);
  const { email, user_id, is_staff, is_superuser, name } = userData;
  console.log("Account :: userData :: ", "Email:", email, "User Id:", user_id);
  const dispatch = useDispatch();
  const sectionIds = ["user information", "danger zone"];

  const handleDeleteUser = async (id) => {
    const dispatchResponse = await dispatch(deleteUser(id));
    console.log("delete user :: dispatchResponse :: ", dispatchResponse);
    // dispatch(deleteUser(user_id));
  };

  const copyIdToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied to Clipboard");
  }

  return (
    <div className="z-40 flex w-full max-w-7xl flex-col justify-between rounded-lg p-4 pt-0 dark:text-white">
      <div className="my-10 flex w-full flex-col gap-y-2">
        <div className="flex items-center justify-start ">
          <h1 className="rounded-lg text-4xl font-semibold w-full text-center">
            Account Settings
          </h1>
        </div>
      </div>

      {/* --- SideBar --- */}
      <div className="flex items-start gap-x-4">
        <div className="sticky top-[calc(0px_+_51px_+16px)] md:flex md:w-1/5 hidden items-center justify-start  duration-300">
          <div className=" flex w-full">
            <Sidebar sectionIds={sectionIds} />
          </div>
        </div>


        <div className="flex md:w-4/5 w-full flex-wrap gap-y-12 text-sm dark:text-white">
          <section className="flex flex-col gap-6 duration-1300" id="user information">
            <div>
              <div>
                <h4 className="inline-block text-2xl font-semibold leading-none pl-2">
                  User Information
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex w-full flex-row gap-y-2 rounded-lg border border-black/10 dark:text-white dark:bg-zinc-950/90 dark:border-white/15 dark:divide-white/15 bg-white max-sm:flex-col duration-300">
                <div className="flex w-1/2 flex-col items-start justify-center gap-y-4 p-8 max-sm:w-full max-sm:p-6">
                  <h4 className="inline-block text-xl font-semibold leading-none ">
                    User Avatar
                  </h4>
                  <p className=" ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                    ducimus commodi recusandae, tempore velit perferendis.
                  </p>
                </div>
                <div className="flex w-1/2 flex-col items-center justify-end gap-y-4 p-8 max-sm:w-full max-sm:p-6">
                  <div className="flex w-full items-center justify-end">
                    <img
                      className="size-32 rounded-full"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=100&w=320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User Image"
                    />
                  </div>
                  <div className="flex w-full items-center justify-end gap-x-4">
                    <span className="inline-block  ">Save the changes</span>
                    <button
                      type="submit"
                      disabled
                      className="rounded-md bg-black px-3 py-2.5 leading-none text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/60 dark:bg-white dark:disabled:bg-white/80 dark:text-black"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>


              <div className="flex w-full flex-row gap-y-2 divide-x divide-black/5 rounded-lg border border-black/10 bg-white max-sm:flex-col max-sm:divide-y dark:bg-zinc-950/90 dark:border-white/15 dark:text-white dark:divide-white/15 duration-300">
                <div className="flex w-1/2 flex-col items-start justify-start gap-y-4 p-8 max-sm:w-full max-sm:p-6">
                  <h4 className="inline-block text-xl font-semibold leading-none ">
                    User Name
                  </h4>
                  <p className=" ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                    ducimus commodi recusandae, tempore velit perferendis.
                  </p>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-1/2 flex-col items-center justify-between gap-y-4 p-8 max-sm:w-full max-sm:p-6"
                >
                  <div className="w-full">
                    <input
                      className="w-full rounded-md border p-2 outline-none focus:border-black/50 dark:text-white dark:bg-zinc-950/90 dark:border-white/15"
                      value={name}
                      onChange={(e) => e.target.value}
                    />
                  </div>
                  <div className="flex w-full items-center justify-end gap-x-4">
                    <span className="inline-block  ">Save the changes</span>
                    <button
                      type="submit"
                      disabled
                      className="rounded-md bg-black px-3 py-2.5 leading-none text-white hover:bg-black/80 disabled:cursor-not-allowed dark disabled:bg-black/60 dark:bg-white dark:disabled:bg-white/80 dark:text-black"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex w-full flex-row gap-y-2 divide-x divide-black/5 rounded-lg border border-black/10 bg-white max-sm:flex-col max-sm:divide-y dark:bg-zinc-950/90 dark:border-white/15 dark:text-white dark:divide-white/15 duration-300">
                <div className="flex w-1/2 flex-col items-start justify-start gap-y-4 p-8 max-sm:w-full max-sm:p-6">
                  <h4 className="inline-block text-xl font-semibold leading-none">
                    User Email
                  </h4>
                  <p className=" ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                    vero fugit nulla rem accusantium numquam!
                  </p>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-1/2 flex-col items-center justify-between gap-y-4 p-8 max-sm:w-full max-sm:p-6"
                >
                  <div className="w-full">
                    <input
                      className="w-full rounded-md border p-2 outline-none focus:border-black/50 dark:text-white dark:bg-zinc-950/90 dark:border-white/15"
                      value={email}
                      onChange={(e) => e.target.value}
                    />
                  </div>
                  <div className="flex w-full items-center justify-end gap-x-4">
                    <span className="inline-block  ">Save the changes</span>
                    <button
                      type="submit"
                      disabled
                      className="rounded-md bg-black px-3 py-2.5 leading-none text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/60 dark:bg-white dark:disabled:bg-white/80 dark:text-black"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex w-full flex-row gap-y-2 divide-x divide-black/5 rounded-lg border border-black/10 bg-white max-sm:flex-col max-sm:divide-y dark:bg-zinc-950/90 dark:border-white/15 dark:text-white dark:divide-white/15 duration-300">
                <div className="flex w-1/2 flex-col items-start justify-start gap-y-4 p-8 max-sm:w-full max-sm:p-6">
                  <h4 className="inline-block text-xl font-semibold leading-none">
                    User ID
                  </h4>
                  <p className=" ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos!
                  </p>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-1/2 flex-col items-center justify-between gap-y-4 p-8 max-sm:w-full max-sm:p-6"
                >
                  <div className="w-full">
                    <input
                      disabled
                      className="w-full rounded-md border p-2 outline-none focus:border-black/50 dark:text-white dark:disabled:bg-zinc-950/90 dark:border-white/15"
                      value={user_id}
                    />
                  </div>
                  <div className="flex w-full items-center justify-end gap-x-4">
                    <span className="inline-block  ">Copy user ID</span>
                    <button
                      type="submit"
                      className="rounded-md bg-black px-3 py-2.5 leading-none text-white hover:bg-black/80 dark:bg-white dark:text-black"
                      onClick={() => copyIdToClipboard(user_id)}
                    >
                      Copy
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex w-[calc(50%_-_1rem)] flex-col items-start justify-start gap-y-4 rounded-lg border border-black/10 bg-white p-8 max-sm:w-full max-sm:p-6 dark:bg-zinc-950/90 dark:border-white/15 dark:text-white dark:divide-white/15 duration-300">
                <div className="flex items-center justify-center">
                  <div className="flex flex-row items-center justify-center gap-x-2">
                    <div className="flex items-center justify-center">
                      <label
                        className={` ${is_superuser ? "bg-green-500" : "bg-red-500"} inline-block size-10 rounded-full border border-black/5`}
                      >
                        <input
                          className="size-0"
                          type="checkbox"
                          checked={is_superuser}
                          onChange={(e) => e.target.checked}
                          onClick={() => {
                            console.log("input clicked");
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex items-center justify-center">
                      <h4 className="inline-block text-xl font-semibold leading-none">
                        Super User
                      </h4>
                    </div>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nobis
                  ut quasi cupiditate aliquam quod.
                </p>
              </div>

              <div className="flex w-[calc(50%_-_1rem)] flex-col items-start justify-start gap-y-4 rounded-lg border border-black/10 bg-white p-8 max-sm:w-full max-sm:p-6 dark:bg-zinc-950/90 dark:border-white/15 dark:text-white dark:divide-white/15 duration-300">
                <div className="flex items-center justify-center">
                  <div className="flex flex-row items-center justify-center gap-x-2">
                    <div className="flex items-center justify-center">
                      <label
                        className={` ${is_staff ? "bg-green-500" : "bg-red-500"} inline-block size-10 rounded-full border border-black/5`}
                      >
                        <input
                          className="size-0"
                          type="checkbox"
                          checked={is_staff}
                          onChange={(e) => e.target.value}
                          onClick={() => {
                            console.log("input clicked");
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex items-center justify-center">
                      <h4 className="inline-block text-xl font-semibold leading-none ">
                        Staff User
                      </h4>
                    </div>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam optio temporibus, quod ab corporis quibusdam?
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6" id="danger zone">
            <div>
              <div>
                <h4 className="inline-block text-xl font-semibold leading-none pl-2">
                  Danger Zone
                </h4>
              </div>
            </div>

            <div
              className="flex w-full flex-row gap-y-2 divide-x divide-red-300 duration-300 dark:divide-red-500 rounded-lg border border-red-300 dark:border-red-500 bg-white dark:bg-zinc-950/90 max-sm:flex-col max-sm:divide-y"
            >
              <div className="flex w-1/2 flex-col items-start justify-start gap-y-4 p-8 max-sm:w-full max-sm:p-6">
                <h4 className="inline-block text-2xl font-semibold leading-none ">
                  Delete Account
                </h4>
                <p className=" ">
                  Permanently remove User Personal Account and all of its contents
                  from Our platform. This action is not reversible, so please
                  continue with caution.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-1/2 flex-col items-center justify-between gap-y-4 p-8 max-sm:w-full max-sm:p-6"
              >
                <div className="w-full">
                  <input
                    disabled
                    className="w-full rounded-md border p-2 outline-none focus:border-black/50 dark:disabled:bg-zinc-950/90 dark:border-white/15"
                    value={user_id}
                  />
                </div>
                <div className="flex w-full items-center justify-end gap-x-4 font-medium text-red-500">
                  <span className="inline-block  ">Delete this account</span>
                  <button
                    type="button"
                    className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-400 "
                    onClick={() => handleDeleteUser(user_id)}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div >
    </div >
  );
};

export default Account;
