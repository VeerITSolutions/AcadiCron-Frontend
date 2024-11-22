import { create } from 'zustand';

interface LogoState {
  logoUrl: string; // Current logo URL
  setLogoUrl: (url: string) => void; // Function to update logo URL
}

export const useLogoStore = create<LogoState>((set : any) => ({
  logoUrl: '/images/logo/logo2.png', // Default logo path
  setLogoUrl: (url: string) => set({ logoUrl: url }),
}));
