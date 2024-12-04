import { create } from 'zustand';

interface LogoState {
  logoUrl: string; // Current logo URL
  setLogoUrl: (url: string) => void; // Function to update logo URL

}
interface UserDetails {
  roleId: string;
  setRoleId: (roleId: string) => void;
}

export const useLogoStore = create<LogoState>((set : any) => ({
  logoUrl: '/images/logo/logo2.png', // Default logo path
  setLogoUrl: (url: string) => set({ logoUrl: url }),
}));

export const useLoginDetails = create<UserDetails>((set) => {
  // Retrieve the roleId from localStorage when initializing the store
  const roleIdFromStorage = localStorage.getItem("role_id");

  return {
    roleId: roleIdFromStorage || '/images/logo/logo2.png', // Default logo if role_id is not found
    setRoleId: (roleId: string) => {
      // Update the store and localStorage
      localStorage.setItem("role_id", roleId);
      set({ roleId });
    },
  };
});