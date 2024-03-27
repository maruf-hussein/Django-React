import { Link, useNavigate } from "react-router-dom";
import { Input } from "..";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../../toolkit/auth/actions";
import { cancelFormSubmission } from "../helpers/functions";
import { toast } from "sonner";

const Signin = () => {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    // ---: Validation variables ---
    const formFieldEmpty = Object.keys(formData).some(
      (key) => formData[key].trim() === "",
    );
    const emailValidateRegEx =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = emailValidateRegEx.test(formData.email);
    // ---: Validation variables ---

    if (!formFieldEmpty && validEmail) {
      // await dispatch(signinUser({ url, formData }));
      const dispatchedResponse = await dispatch(signinUser({ url, formData }));
      console.log(
        "Signin.jsx :: (dispatchedResponse) :: \n",
        dispatchedResponse,
      );
      if (dispatchedResponse.type === "auth/signin/fulfilled") {
        const userId = await dispatchedResponse.payload.data.user_id;
        console.log("Signin.jsx :: dispatchedResponse :: ", dispatchedResponse);
        await setFormData(initialFormData);
        await navigate(`/${userId}/~`);
      }
    } else if (formFieldEmpty) {
      toast.warning("Please fill in the input fields, it cannot be empty.");
    } else if (!validEmail) {
      toast.warning("Invalid email address.");
    }
  };

  return (
    <div className="flex w-full justify-center ">
      <div className="flex h-fit w-full max-w-[23rem] flex-col gap-y-16 pt-16">
        <div className="w-full">
          <h1 className="w-full text-center font-serif text-3xl font-medium">
            Sign In
          </h1>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-lg font-poppins text-sm"
          >
            <div className="flex w-full flex-col gap-y-6">
              <div className="flex w-full flex-col gap-y-3">
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                  autoComplete={"email"}
                />

                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(value) => handleInputChange("password", value)}
                  autoComplete={"current-password"}
                />
              </div>

              <div className="mt-[7px] flex w-full items-center justify-between gap-x-2">
                <button
                  type="reset"
                  className="w-2/5 rounded-lg border border-black/5 bg-white py-[11px] text-center leading-none text-black duration-300 hover:bg-gray-100"
                  onClick={() =>
                    cancelFormSubmission({ setFormData, initialFormData })
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-3/5 rounded-lg border border-black/5 bg-black py-[11px] text-center leading-none text-white duration-300 hover:bg-black/80 "
                >
                  Submit
                </button>
              </div>

              <div className="flex w-full items-center justify-center">
                <div className="flex flex-row gap-x-1 text-[13px] leading-none ">
                  <span>Don&apos;t have an account</span>
                  <Link to={"/signup"} className="underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
