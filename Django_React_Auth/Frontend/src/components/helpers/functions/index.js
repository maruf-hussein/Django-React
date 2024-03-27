import { jwtDecode } from "jwt-decode";
import { failedToGetToken } from "../../../toolkit/auth/actions";

// --- cancelFormSubmission ---
export const cancelFormSubmission = ({ setFormData, initialFormData }) => {
  setFormData(initialFormData);
};

// --- (userData) to LocalStorage ---
export const setUserDataToLocalStorage = (userData) => {
  return localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
// --- (userData) to LocalStorage ---

// --- (authToken) to LocalStorage ---
export const setTokenToLocalStorage = (token) => {
  return localStorage.setItem("authToken", JSON.stringify(token));
};

export const getTokenFromLocalStorage = () => {
  let response;
  try {
    const tokensString = localStorage.getItem("authToken");
    console.log("GetTokens :: tokens :: tokensString :: ", tokensString);

    if (!tokensString) {
      response = { tokens: null, code: "missing" };
      console.log("Tokens are missing.");
      return response;
    }

    const parsedTokens = JSON.parse(tokensString);
    console.log("Parsed tokens:", parsedTokens);

    const validateToken = (token) => {
      if (!token) {
        console.log("validateToken :: token :: missing ::", token);
        return false; // Token is missing
      }
      // --- Example: Check token format (e.g., JWT)
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.log("validateToken :: token :: InvalidFormat ::", token);
        return false; // Invalid token format
      }
      // --- If the token passes all checks, return true to indicate it's valid
      return true;
    };

    const validateTokens = (tokens) => {
      if (
        !tokens ||
        typeof tokens !== "object" ||
        !tokens.access ||
        !tokens.refresh
      ) {
        console.log("validateTokens :: ", tokens);
        return null; // Tokens are missing or invalid
      }

      // --- Validate access token
      const isValidAccessToken = validateToken(tokens.access);
      if (!isValidAccessToken) {
        return null; // Access token is invalid
      }

      // --- Validate refresh token
      const isValidRefreshToken = validateToken(tokens.refresh);
      if (!isValidRefreshToken) {
        return null; // Refresh token is invalid
      }

      // --- Tokens are valid
      return tokens;
    };

    const validTokens = validateTokens({ ...parsedTokens });

    if (validTokens) {
      console.log("Tokens are valid:", validTokens);
      response = { tokens: validTokens, code: "success" };
    } else {
      console.log("Invalid tokens or missing tokens.");
      response = { tokens: null, code: "invalid" };
      console.log("Invalid tokens or missing tokens ::", response);
    }
  } catch (error) {
    console.error("GetTokens :: error :: ", error);
    response = { tokens: null, code: "error", errorMessage: error.message };
  }
  return response;
};

export const removeTokenFromLocalStorage = () => {
  const ifHasToken = getTokenFromLocalStorage();
  console.log("Has not token in local storage, ifHasToken", ifHasToken);
  if (ifHasToken !== null) {
    localStorage.removeItem("authToken");
    console.log("Removed token from local storage");
  }
  if (ifHasToken === null) {
    throw new Error("Has not token in local storage, ifHasToken", ifHasToken);
  }
};
// --- (authToken) to LocalStorage ---

export const decodeUserDataFromToken = (authToken) => {
  // console.log("Decode :: authToken :: ", authToken);
  let data;
  if (authToken.code === "success") {
    data = jwtDecode(authToken.tokens.access);
    // console.log("Decode :: authToken :: success :: ", data);
  } else {
    // console.log("Decode :: authToken :: failed :: ", data);
  }
  return data;
};
