import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [IsSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  function updateProfile(name) {
    return currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        setCurrentUser(auth.currentUser);
      });
  }

  async function signupWithEmailPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function signinWithEmailPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
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
    updateProfile,
    IsSeller,
    signupWithEmailPassword,
    signinWithEmailPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
