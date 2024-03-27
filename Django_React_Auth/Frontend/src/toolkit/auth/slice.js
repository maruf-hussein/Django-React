import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteUser,
  failedToGetToken,
  signinUser,
  signoutUser,
  signupUser,
  updateStoreFromLocalStorage,
} from "./actions";
import {
  decodeUserDataFromToken,
  getTokenFromLocalStorage,
} from "../../components/helpers/functions";

export const isAuthenticated = () => {
  let authenticated = false;
  const tokens = getTokenFromLocalStorage();
  if (tokens && tokens.code === "success") {
    console.log("isAuthenticated :: tokens :: ", tokens);
    authenticated = true;
  } else {
    console.log("isAuthenticated :: tokens :: ", tokens);
    authenticated = false;
  }

  return authenticated;
};

const userData = () => {
  const tokens = getTokenFromLocalStorage();
  console.log("userData :: tokens :: ", tokens);
  if (tokens && tokens.code === "success") {
    const r =
      tokens.code === "success" ? decodeUserDataFromToken(tokens) : null;
    console.log("userData :: r :: ", r);
    return r;
  }
};

const initialState = {
  isAuthenticated: isAuthenticated(),
  userData: userData(),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---: Fulfilled cases ---
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log("auth :: signUpUser :: action.payload", action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.data;
        console.log("auth :: signUpUser :: fulfilled...");
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        // console.log("auth :: signInUser :: action.payload", action.payload);
        state.isAuthenticated = true;
        state.loading = false;
        state.userData = action.payload.data;
        console.log("auth :: signInUser :: fulfilled...");
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.error = null;
        state.loading = false;
        console.log("auth :: signOutUser :: fulfilled...");
      })
      .addCase(failedToGetToken.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.error = null;
        state.loading = false;
        console.log("auth :: failedToGetToken :: fulfilled...");
      })
      .addCase(updateStoreFromLocalStorage.fulfilled, (state, action) => {
        // console.log("auth :: updateStoreFromLocalStorage :: action.payload",action.payload,);
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.error = null;
        state.loading = false;
        console.log("auth :: updateStoreFromLocalStorage :: fulfilled...");
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.error = null;
        state.loading = false;
        console.log("auth :: deleteUser :: fulfilled...");
      });

    // ---: Pending cases ---
    builder.addMatcher(
      isAnyOf(
        signupUser.pending,
        signinUser.pending,
        signoutUser.pending,
        failedToGetToken.pending,
      ),
      (state) => {
        state.isAuthenticated = false;
        state.loading = true;
        state.error = null;
        state.userData = null;
        console.log("auth :: sign...User :: pending...");
      },
    );

    // ---: Rejected cases ---
    builder.addMatcher(
      isAnyOf(
        signupUser.rejected,
        signinUser.rejected,
        signoutUser.rejected,
        failedToGetToken.rejected,
        updateStoreFromLocalStorage.rejected,
      ),
      (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.userData = null;
        state.error = action.error.message;
        console.log("action.error.message: ", action.error.message);
        console.log("auth :: sign...User :: rejected...");
      },
    );
  },
});

export default authSlice.reducer;
