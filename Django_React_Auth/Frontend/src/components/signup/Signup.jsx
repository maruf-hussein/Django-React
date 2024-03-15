import { useState } from "react";
import { Input } from "..";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const initialFormData = {
    username: "",
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
    const validUsername = /^[a-z][a-z0-9_]*[a-z0-9_]$/.test(
      formData.username.trim(),
    );
    const validPassword = formData.password.trim().length >= 8;

    if (formFieldEmpty) {
      console.log("formFieldEmpty: ", formFieldEmpty);
      toast.warning("Please fill in the input fields, it cannot be empty.");
    } else if (!validUsername || !formData.username.trim().length > 5) {
      console.log("validUsername: ", validUsername);
      toast.warning(
        "Invalid username, Username must be 5 characters long and cannot start with uppercase letters, number or special characters.",
      );
    } else if (!validEmail) {
      console.log("validEmail: ", validEmail);
      toast.warning("Invalid email address.");
    } else if (!validPassword) {
      console.log("validEmail: ", validEmail);
      toast.warning("Invalid password, password must be 8 characters long.");
    }

    if (!formFieldEmpty && validUsername && validEmail && validPassword) {
      console.log("formFieldEmpty: ", formFieldEmpty);

      try {
        axios
          .post(`${url}/signup/`, formData)
          .then((response) => {
            console.log("Signup response: ", response);
            if (response.status === 201) {
              toast.success(response.data.details);
              console.log("Signup response details: ", response.data.details);
            }
            setFormData(initialFormData);
            navigate("/signin--⁕");
          })
          .catch((error) => {
            if (error.response.status === 409) {
              toast.error(error.response.data.details);
              console.log(
                "Signup response details: ",
                error.response.data.details,
              );
            } else if (error.response.status === 405) {
              toast.error(error.response.data.detail);
              console.log("Signup response details: ", error.response);
            }
          });
      } catch (error) {
        console.log(" Signup error: ", error);
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
                  label="Username"
                  type="text"
                  value={formData.username}
                  onChange={(value) => handleInputChange("username", value)}
                  autoComplete={"username"}
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
                  <span>Already have an account</span>
                  <Link to={"/signin--⁕"} className="underline">
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
