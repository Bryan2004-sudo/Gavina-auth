"use client";

import React from "react";
import { UserAuth } from "../context/AuthContext";



export default function Home() {
  const { user } = UserAuth();

  return (
    <main className="p-8 flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-xl mb-4 text-green-400">nood ka muna kay h2</p>

          
          <video
            src="/video/QwRNbaQN.mp4" 
            controls
            autoPlay
            loop
            muted
            className="w-full max-w-xl rounded-lg shadow-lg"
          />
        </div>
      ) : (
        <p className="text-lg text-gray-400">Please log in to see the video.</p>
      )}
    </main>
  );
}
