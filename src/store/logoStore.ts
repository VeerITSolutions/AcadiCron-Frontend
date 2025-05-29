import { create } from "zustand";
import { useEffect } from "react";

// Define the state types
interface LogoState {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

interface UserDetails {
  roleId: string;
  userId: string;
  userData: any;
  username: string | null;
  surname: string | null;
  roleName: string | null;
  isSuperAdmin: string | null;
  selectedSessionId: string | null;
  selectedSessionName: string | null;
  setRoleId: (roleId: string) => void;
  setUserDetails: (userDetails: Partial<UserDetails>) => void;
}

// Zustand store for logo
export const useLogoStore = create<LogoState>((set) => ({
  logoUrl: "/images/logo/logo2.png",
  setLogoUrl: (url: string) => set({ logoUrl: url }),
}));

// Zustand store for user login details
export const useLoginDetails = create<UserDetails>((set) => ({
  roleId: "",
  userId: "",
  userData: {},
  username: null,
  surname: null,
  roleName: null,
  isSuperAdmin: null,
  selectedSessionId: null,
  selectedSessionName: null,
  setRoleId: (roleId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("role_id", roleId);
    }
    set({ roleId });
  },
  setUserDetails: (userDetails: Partial<UserDetails>) => {
    set((prev) => ({ ...prev, ...userDetails }));
  },
}));

// Custom hook to initialize login details from localStorage
export function useInitializeLoginDetails() {
  const setUserDetails = useLoginDetails((state) => state.setUserDetails);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roleId = localStorage.getItem("role_id") || "";
      const userId = localStorage.getItem("user_id") || "";
      const username = localStorage.getItem("username") || "";
      const surname = localStorage.getItem("surname") || "";
      const roleName = localStorage.getItem("role_name") || "";
      const isSuperAdmin = localStorage.getItem("is_superadmin") || "";
      const selectedSessionId = localStorage.getItem("selectedSessionId") || "";
      const selectedSessionName =
        localStorage.getItem("selectedSessionYear") || "";
      const rawUserData = localStorage.getItem("user_data");

      let parsedUserData: any = {};
      try {
        parsedUserData =
          rawUserData && rawUserData !== "undefined"
            ? JSON.parse(rawUserData)
            : {};
      } catch {
        parsedUserData = {};
      }

      // Set into Zustand store
      setUserDetails({
        roleId,
        userId,
        username,
        surname,
        roleName,
        isSuperAdmin,
        selectedSessionId,
        selectedSessionName,
        userData: parsedUserData,
      });
    }
  }, [setUserDetails]);
}
