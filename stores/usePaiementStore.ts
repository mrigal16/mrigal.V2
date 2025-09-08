import { create } from "zustand";
import { persist } from "zustand/middleware";

type PaiementData = {
  id?: number;
  montant?: string;
  status?: string;
  date?: string;
  num_avis?: string;
  userId: string;
  files: string;
  urls: string[];
};

type PaiementStore = {
  data: PaiementData | null;
  setData: (data: PaiementData) => void;
  clearData: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const usePaiementStore = create<PaiementStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
      clearData: () => set({ data: null }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "paiement-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
