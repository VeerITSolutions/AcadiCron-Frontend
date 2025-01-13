import { create } from 'zustand';
import { useEffect } from 'react';

// Define the state types for LogoStore and UserDetails
interface LogoState {
  logoUrl: string; // Current logo URL
  setLogoUrl: (url: string) => void; // Function to update logo URL
}

interface UserDetails {
  roleId: string;
  username: string | null;
  surname: string | null;
  roleName: string | null;
  isSuperAdmin: string | null;
  selectedSessionId: string | null;
  selectedSessionName: string | null;
  setRoleId: (roleId: string) => void;
  setUserDetails: (userDetails: UserDetails) => void; // Function to update all user details
}

// Create Zustand store for the logo URL
export const useLogoStore = create<LogoState>((set) => ({
  logoUrl: '/images/logo/logo2.png', // Default logo path
  setLogoUrl: (url: string) => set({ logoUrl: url }),
}));

// Create Zustand store for user login details
export const useLoginDetails = create<UserDetails>((set) => ({
  roleId: '', // Initial empty value for roleId
  username: null,
  surname: null,
  roleName: null,
  isSuperAdmin: null,
  selectedSessionId: null,
  selectedSessionName: null,
  setRoleId: (roleId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('role_id', roleId); // Store the roleId in localStorage
    }
    set({ roleId }); // Update the store with the new roleId
  },
  setUserDetails: (userDetails: UserDetails) => {
    set({
      roleId: userDetails.roleId,
      username: userDetails.username,
      surname: userDetails.surname,
      roleName: userDetails.roleName,
      isSuperAdmin: userDetails.isSuperAdmin,
      selectedSessionId: userDetails.selectedSessionId,
    });
  }, // Set all user details in the store
}));

// Custom hook to initialize login details from localStorage (only on the client side)
export function useInitializeLoginDetails() {
  const setUserDetails = useLoginDetails((state) => state.setUserDetails);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get user details from localStorage
      const roleIdFromStorage = localStorage.getItem('role_id') || '';
      const usernameFromStorage = localStorage.getItem('username') || '';
      const surnameFromStorage = localStorage.getItem('surname') || '';
      const roleNameFromStorage = localStorage.getItem('role_name') || '';
      const isSuperAdminFromStorage = localStorage.getItem('is_superadmin') || '';
      const selectedSessionIdFromStorage = localStorage.getItem('selectedSessionId') || '';
      const selectedSessionYearFromStorage = localStorage.getItem('selectedSessionYear') || '';

      // Set all values into the Zustand store using setUserDetails
      setUserDetails({
        roleId: roleIdFromStorage,
        username: usernameFromStorage,
        surname: surnameFromStorage,
        roleName: roleNameFromStorage,
        isSuperAdmin: isSuperAdminFromStorage,
        selectedSessionId: selectedSessionIdFromStorage,
        selectedSessionName: selectedSessionYearFromStorage,
        setRoleId: () => {}, // Optional: add empty function for `setRoleId` if you don't need to use it in this context
        setUserDetails: () => {}, // Optional: add empty function for `setUserDetails` if you don't need to use it in this context
      });
    }
  }, [setUserDetails]); // Only runs once after the component mounts (on client side)
}
