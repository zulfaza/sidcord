import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import API_URL from "../config/API";
import { auth } from "../config/Firebase";
import StringToSlug from "../utils/StringToSlug";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [IsSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signupWithEmailPassword(
    email,
    password,
    name,
    phone,
    isSeller = false
  ) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.error(error);
      return { isError: true, massage: error.massage, user: null };
    });

    if (!userCredential) {
      return userCredential;
    }

    const photoURL = `https://ui-avatars.com/api/?name=${StringToSlug(
      name,
      "+"
    )}`;

    const ProfileUpdated = await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });

    if (!ProfileUpdated) {
      return { isError: true, massage: "Failed to upate user profile" };
    }

    const token = await userCredential.user.getIdToken();
    const config = {
      headers: {
        authentication: token,
      },
    };
    const request = {
      uid: userCredential.user.uid,
      email: email,
      name: name,
      phone: phone,
      photoURL: photoURL,
    };

    const api_endpoint = isSeller ? "/sellers" : "/customers";

    return await axios
      .post(API_URL + api_endpoint, request, config)
      .then((response) => {
        return {
          massage: "success",
          data: response,
          user: userCredential.user,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          isError: true,
          massage: err.massage,
        };
      });
  }

  async function signinWithEmailPassword(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.error(error);
      return { isError: true, massage: error.massage, user: null };
    });

    if (!userCredential) {
      return userCredential;
    }

    return {
      isError: false,
      massage: "success",
    };
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((res) => {
          if (res.claims.seller) {
            setIsSeller(true);
          } else {
            setIsSeller(false);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
      setCurrentUser(user);
    });
    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    logout,
    IsSeller,
    signupWithEmailPassword,
    signinWithEmailPassword,
    setIsSeller,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
