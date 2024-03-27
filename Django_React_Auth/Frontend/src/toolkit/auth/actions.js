import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import {
  decodeUserDataFromToken,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../components/helpers/functions";

// export const getToken = () => {};

// --- (signupUser) ---
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ url, formData }) => {
    const signUpPromise = axios.post(`${url}/signup/`, formData);

    toast.promise(signUpPromise, {
      loading: "Loading...",
      success: (data) => {
        if (data.status === 201) {
          // console.log("Signup.jsx :: Toast.Success :: (data) :: \n", data);
          return `${data.data.detail}`;
        }
      },
      error: (error) => {
        const errorMessage = error.response.data.detail;
        // console.log("Signup.jsx :: Toast.Error :: (error) :: \n", errorMessage);
        return `${errorMessage}`;
      },
    });

    const mainResponse = await signUpPromise
      .then((res) => {
        // console.log("Actions :: SignUpUser :: (mainResponse) -> ",signUpPromise,);
        // console.log("Actions :: SignUpUser :: (res) -> ", res);
        if (res.status === 201) {
          setTokenToLocalStorage(res.data.tokens);
          const authToken = getTokenFromLocalStorage();
          // console.log("authTokens::", authToken);
          const userData = decodeUserDataFromToken(authToken);

          let response = {
            data: userData,
            status: res.status,
          };
          console.log("Actions :: SignUpUser :: (response) -> ", response);
          return response;
        }
      })
      .catch((err) => {
        console.log("Actions :: SignUpUser :: (error) -> ", err);
        const errorMessage = err.response.data.detail;
        throw new Error(errorMessage);
        // return errorMessage
      });

    return mainResponse;
  },
);

// --- (signinUser) ---
export const signinUser = createAsyncThunk(
  "auth/signin",
  async ({ url, formData }) => {
    const signInPromise = axios.post(`${url}/token/`, formData);

    toast.promise(signInPromise, {
      loading: "Loading...",
      success: (data) => {
        if (data.status === 200) {
          // console.log("Signin.jsx :: Toast.Success :: (data) :: \n", data);
          return `${"Sign In was successful"}`;
        }
      },
      error: (error) => {
        const errorMessage = error.response.data.detail;
        // console.log("Signin.jsx :: Toast.Error :: (error) :: \n", errorMessage);
        return `${errorMessage}`;
      },
    });

    const mainResponse = await signInPromise
      .then((res) => {
        // console.log("Actions :: SignInUser :: (mainResponse) -> ",signInPromise,);

        if (res.status === 200) {
          setTokenToLocalStorage(res.data);
          const authToken = getTokenFromLocalStorage();
          console.log("authTokens::", authToken);
          const userData = decodeUserDataFromToken(authToken);

          let response = {
            data: userData,
            status: res.status,
          };
          // console.log("Actions :: SignInUser :: (response) -> ", response);
          return response;
        }
      })
      .catch((err) => {
        console.log("Actions :: SignInUser :: (error) -> ", err);
        const errorMessage = err.response.data.detail;
        throw new Error(errorMessage);
        // return errorMessage
      });

    return mainResponse;
  },
);

// --- (signoutUser) ---
export const signoutUser = createAsyncThunk("auth/signout", async () => {
  removeTokenFromLocalStorage();
});

// --- (deleteUser) ---
export const deleteUser = createAsyncThunk("auth/delete", async (user_id) => {
  console.log("Actions :: DeleteUser :: (user_id) -> ", user_id);
  const deletePromise = axios.delete(
    `http://127.0.0.1:8000/api/user_detail/${user_id}/`,
  );

  toast.promise(deletePromise, {
    loading: "Loading...",
    success: (data) => {
      if (data.status === 202) {
        // console.log("Signup.jsx :: Toast.Success :: (data) :: \n", data);
        return `${data.data.detail}`;
      }
    },
    error: (error) => {
      const errorMessage = error.response.data.detail;
      // console.log("Signup.jsx :: Toast.Error :: (error) :: \n", errorMessage);
      return `${errorMessage}`;
    },
  });

  const mainResponse = await deletePromise
    .then((res) => {
      // console.log("Actions :: DeleteUser :: (mainResponse) -> ",deletePromise,);
      // console.log("Actions :: DeleteUser :: (res) -> ", res);
      if (res.status === 202) {
        removeTokenFromLocalStorage();
        let response = {
          data: res.data,
          status: res.status,
        };
        // console.log("Actions :: DeleteUser :: (response) -> ", response);
        return response;
      }
    })
    .catch((err) => {
      console.log("Actions :: DeleteUser :: (error) -> ", err);
      const errorMessage = err.response.data.detail;
      throw new Error(errorMessage);
      // return errorMessage
    });

  return mainResponse;
});

export const failedToGetToken = createAsyncThunk(
  "auth/failedToGetToken",
  async () => {
    console.log("Actions :: FailedToGetToken :: failed to get token");
  },
);

// updateStore from the token of localStorage
export const updateStoreFromLocalStorage = createAsyncThunk(
  "auth/updateStoreFromLocalStorage",
  async () => {
    console.log("updateStoreFromLocalStorage get called..............");
    const authTokens = getTokenFromLocalStorage();
    let userData;
    console.log("updateStore :: authToken :: ", authTokens);
    if (authTokens.code === "success") {
      userData = decodeUserDataFromToken(authTokens);
      console.log("updateStore :: userData :: ", userData);
      return userData;
    } else {
      throw new Error("Failed to authenticate user");
    }
  },
);

// --- updateUser info ---
export const updateUserData = createAsyncThunk(
  "auth/updateUserInfo",
  async (userData) => {
    const updatePromise = axios.put(
      `http://127.0.0.1:8000/api/update_user/${userData.id}/`,
      userData,
    );

    toast.promise(updatePromise, {
      loading: "Loading...",
      success: (data) => {
        if (data.status === 202) {
          // console.log("updateUserData.jsx :: Toast.Success :: (data) :: \n", data);
          return `${data.data.detail}`;
        }
      },
      error: (error) => {
        const errorMessage = error.response.data.detail;
        // console.log("updateUserData.jsx :: Toast.Error :: (error) :: \n", errorMessage);
        return `${errorMessage}`;
      },
    });

    const mainResponse = await updatePromise
      .then((res) => {
        // console.log("Actions :: UpdateUser :: (mainResponse) -> ",updatePromise,);
        // console.log("Actions :: UpdateUser :: (res) -> ", res);
        if (res.status === 202) {
          let response = {
            data: res.data,
            status: res.status,
          };
          // console.log("Actions :: UpdateUser :: (response) -> ", response);
          return response;
        }
      })
      .catch((err) => {
        console.log("Actions :: UpdateUser :: (error) -> ", err);
        const errorMessage = err.response.data.detail;
        throw new Error(errorMessage);
        // return errorMessage
      });

    return mainResponse;
  },
);
