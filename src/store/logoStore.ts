import { create } from 'zustand';

interface LogoState {
  logoUrl: string; // Current logo URL
  setLogoUrl: (url: string) => void; // Function to update logo URL

}
interface UserDetails {
  roleId: string;
  username : string;
  surname : string;
  roleName : string;
  isSuperAdmin : string;
  selectedSessionId : string,
  setRoleId: (roleId: string) => void;
}

export const useLogoStore = create<LogoState>((set : any) => ({
  logoUrl: '/images/logo/logo2.png', // Default logo path
  setLogoUrl: (url: string) => set({ logoUrl: url }),
}));

export const useLoginDetails = create<UserDetails>((set) => {
  // Retrieve the roleId from localStorage when initializing the store
  const roleIdFromStorage = localStorage.getItem("role_id");
  const usernameFromStorage = localStorage.getItem("username");
  const surnameFromStorage = localStorage.getItem("surname");
  const roleNameFromStorage = localStorage.getItem("role_name");
  const isSuperAdminFromStorage = localStorage.getItem("is_superadmin");
  const selectedSessionIdFromStorage = localStorage.getItem('selectedSessionId');

  return {
    roleId: roleIdFromStorage || '/images/logo/logo2.png',
    username : usernameFromStorage,
    surname : surnameFromStorage,
    roleName : roleNameFromStorage,
    isSuperAdmin : isSuperAdminFromStorage,
    selectedSessionId: selectedSessionIdFromStorage,
    setRoleId: (roleId: string) => {
      // Update the store and localStorage
      localStorage.setItem("role_id", roleId);
      set({ roleId });
    },
  };
});
