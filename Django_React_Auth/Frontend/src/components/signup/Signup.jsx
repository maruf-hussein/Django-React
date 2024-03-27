import { useState } from "react";
import { Input } from "..";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signupUser } from "../../toolkit/auth/actions";
import { useDispatch } from "react-redux";

const Signup = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BACKEND_BASE_URL;

    const formFieldEmpty = Object.keys(formData).some(
      (key) => formData[key].trim() === "",
    );
    const emailValidateRegEx =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = emailValidateRegEx.test(formData.email);
    const validPassword = formData.password.trim().length >= 8;

    if (formFieldEmpty) {
      console.log("formFieldEmpty: ", formFieldEmpty);
      toast.warning("Please fill in the input fields, it cannot be empty.");
    } else if (!validEmail) {
      console.log("validEmail: ", validEmail);
      toast.warning("Invalid email address.");
    } else if (!validPassword) {
      console.log("validEmail: ", validEmail);
      toast.warning("Password must be 8 characters long.");
    }

    if (!formFieldEmpty && validEmail && validPassword) {
      const dispatchedResponse = await dispatch(
        signupUser({ url, formData, setFormData, initialFormData, navigate }),
      );
      if (dispatchedResponse.type === "auth/signup/fulfilled") {
        const user_id = await dispatchedResponse.payload.data.user_id;
        console.log("Signup :: dispatchedResponse :: ", dispatchedResponse);
        setFormData(initialFormData);
        navigate(`/${user_id}/~`);
      }
    }
  };

  return (
    <div className="flex w-full justify-center ">
      <div className="flex h-fit w-full max-w-[23rem] flex-col gap-y-16 pt-16">
        <div className="w-full">
          <h1 className="w-full text-center font-serif text-3xl font-medium">
            Sign Up
          </h1>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-lg font-poppins text-sm"
            autoComplete="on"
          >
            <div className="flex w-full flex-col gap-y-6">
              <div className="flex w-full flex-col gap-y-3">
                <Input
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  autoComplete={"name"}
                />

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

              <div className="mt-[7px] flex w-full items-center justify-between gap-x-4">
                <button
                  type="reset"
                  className="w-2/5 rounded-lg border border-black/5 bg-white py-[11px] text-center leading-none text-black duration-300 hover:bg-gray-100"
                  onClick={() => {
                    setFormData(initialFormData);
                  }}
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
                  <span>Already have an account</span>
                  <Link to={"/signin"} className="underline">
                    Sign In
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

export default Signup;
