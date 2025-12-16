"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [emotion, setEmotion] = useState("");
  const [stressLevel, setStressLevel] = useState("");

  return (
    <UserContext.Provider
      value={{ emotion, setEmotion, stressLevel, setStressLevel }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserState = () => useContext(UserContext);
