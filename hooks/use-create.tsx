import { create } from "zustand";

type CreateStoreValues = {
  prompt: string;
};

const initialValue = { pristine: true, values: { prompt: "" } };

type UseCreateStore = {
  pristine: boolean;
  setPristine: (pristine: boolean) => void;
  values: CreateStoreValues;
  getValue: (key: keyof CreateStoreValues) => any;
  setValue: (
    key: keyof CreateStoreValues,
    value: any | ((prev: any) => any)
  ) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  reset: () => void;
};

export const useCreateStore = create<UseCreateStore>()((set, get) => ({
  reset: () => set(initialValue),
  pristine: true,
  setPristine: (pristine) => set((state) => ({ ...state, pristine })),
  values: {
    prompt: "",
  },
  getValue: (key) => get().values[key],
  setValue: (key, updater) =>
    set((state) => ({
      ...state,
      // Set pristine to false when a value is updated
      pristine: false,
      values: {
        ...state.values,
        [key]:
          typeof updater === "function" ? updater(state.values[key]) : updater,
      },
    })),
  sidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ ...state, sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set((state) => ({ ...state, sidebarOpen: open })),
}));
