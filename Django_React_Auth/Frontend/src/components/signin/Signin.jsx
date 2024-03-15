import { Link, useNavigate } from "react-router-dom";
import { Input } from "..";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Signin = () => {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
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

    if (formFieldEmpty) {
      toast.warning("Please fill in the input fields, it cannot be empty.");
    } else if (!validEmail) {
      toast.warning("Invalid email address.");
    }

    if (!formFieldEmpty && validEmail) {
      try {
        await axios
          .post(`${url}/signin/`, formData)
          .then((res) => {
            console.log("RES=== ", res);

            console.log("Submited --", "Form-Data: ", formData);
            toast.success(`${res.data.details}`);

            setFormData(initialFormData);
            navigate("/--⁕");
          })
          .catch((error) => {
            console.log("SIGNIN ERROR: ", error);
            toast.error(`${error.response.data.details}`);
          });
      } catch (error) {
        toast.error(error.response.data.details);
      }
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

              <div className="mt-[7px] flex w-full items-center justify-between gap-x-1">
                <button
                  type="reset"
                  className="w-2/5 rounded-[4px] border border-black/5 bg-gray-200 py-3 text-center leading-none text-black duration-300 hover:bg-gray-300"
                  onClick={() => {
                    setFormData(initialFormData);
                  }}
                >
                  Cencel
                </button>
                <button
                  type="submit"
                  className="w-3/5 rounded-[4px] border border-black/5 bg-black py-3 text-center leading-none text-white duration-300 hover:bg-black/80 "
                >
                  Submit
                </button>
              </div>

              <div className="flex w-full items-center justify-center">
                <div className="flex flex-row gap-x-1 text-[13px] leading-none ">
                  <span>Don&apos;t have an account</span>
                  <Link to={"/signup--⁕"} className="underline">
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
