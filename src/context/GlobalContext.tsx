// src/context/GlobalContext.tsx
"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define a type for your context state
interface GlobalContextType {
  someValue: string;
  setSomeValue: React.Dispatch<React.SetStateAction<string>>;
  themType: string;
  setThemType: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with default values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create a GlobalProvider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [someValue, setSomeValue] = useState("light");
  const [themType, setThemType] = useLocalStorage("color-theme", "light");

  return (
    <GlobalContext.Provider
      value={{ someValue, setSomeValue, themType, setThemType }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
