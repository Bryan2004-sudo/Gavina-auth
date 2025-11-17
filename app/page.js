"use client";

import React, { useState } from "react";
import { UserAuth } from "./context/AuthContext";

export default function Home() {
  const {
    user,
    googleSignIn,
    githubSignIn,
    emailSignIn,
    emailSignUp,
    logOut,
  } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleEmailAuth = async () => {
    try {
      if (isSignUp) {
        await emailSignUp(email, password);
      } else {
        await emailSignIn(email, password);
      }
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] animate-gradient opacity-90"></div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.1),transparent_70%)]"></div>

      <div className="relative z-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-10 max-w-md text-center shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 tracking-wide text-cyan-400">
          Welcome to <span className="text-white">GavinaAuth</span>
        </h1>
        <p className="text-gray-300 mb-8">Login securely with your account.</p>

        {user ? (
          <div className="space-y-6">
            <p className="text-xl text-green-400 font-semibold">
              Hello, {user.displayName || user.email || "User"} 👋
            </p>

            <video
              src="/video/lofdVDSb.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full rounded-lg border border-white/10 shadow-lg"
            />

            <button
              onClick={logOut}
              className="w-full py-2 mt-6 bg-red-600/80 hover:bg-red-500 text-white font-bold rounded-md transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={googleSignIn}
                className="glow-button bg-[#DB4437] hover:bg-[#c23321] flex items-center justify-center py-2 rounded-md"
              >
                <img src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>

              <button
                onClick={githubSignIn}
                className="glow-button bg-gray-800 hover:bg-gray-700 flex items-center justify-center py-2 rounded-md"
              >
                <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 mr-2" />
                Sign in with GitHub
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm my-4">
              <div className="flex-1 h-px bg-gray-700"></div>
              or
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            <div className="flex flex-col gap-3 text-left">
              {error && <p className="text-red-500">{error}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-black/20 border border-gray-600 text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-black/20 border border-gray-600 text-white"
              />
              <button
                onClick={handleEmailAuth}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-md transition-all"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
              <p
                className="text-sm text-gray-400 mt-2 cursor-pointer hover:text-white"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
