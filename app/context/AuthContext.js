"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; 
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupLoading, setPopupLoading] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    if (popupLoading) return; 
    setPopupLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Google popup cancelled or already open.");
      } else {
        console.error("Google Sign-In Error:", error);
      }
    } finally {
      setPopupLoading(false);
    }
  };

  const githubSignIn = async () => {
    if (popupLoading) return;
    setPopupLoading(true);
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("GitHub popup cancelled or already open.");
      } else {
        console.error("GitHub Sign-In Error:", error);
      }
    } finally {
      setPopupLoading(false);
    }
  };

  const emailSignUp = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email Sign-Up Error:", error);
      throw error;
    }
  };

 const emailSignIn = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password must be provided.");
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email format.");
  }
  return signInWithEmailAndPassword(auth, email, password);
};

  // 🔹 Sign Out
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        githubSignIn,
        emailSignIn,
        emailSignUp,
        logOut,
        popupLoading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook to access auth context
export const UserAuth = () => useContext(AuthContext);
