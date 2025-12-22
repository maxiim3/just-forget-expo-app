import { create } from "zustand";
import type { Entry } from "./supabase";

type ViewMode = "stack" | "grid";
type SortMode = "modified" | "alphabetical";

interface AppState {
  // Entries
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  addEntry: (entry: Entry) => void;
  updateEntry: (id: string, updates: Partial<Entry>) => void;
  archiveEntry: (id: string) => void;
  deleteEntry: (id: string) => void;

  // Selection (multi-select)
  selectedEntryIds: Set<string>;
  toggleSelectedEntry: (id: string) => void;
  clearSelection: () => void;
  archiveSelected: () => void;
  deleteSelected: () => void;

  // View settings
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;

  // UI state
  isCapturing: boolean;
  setIsCapturing: (value: boolean) => void;
  currentCardIndex: number;
  setCurrentCardIndex: (index: number) => void;
  editingEntry: Entry | null;
  setEditingEntry: (entry: Entry | null) => void;
  editDrawerEntry: Entry | null;
  setEditDrawerEntry: (entry: Entry | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Entries
  entries: [],
  setEntries: (entries) => set({ entries }),
  addEntry: (entry) => set((state) => ({ entries: [entry, ...state.entries] })),
  updateEntry: (id, updates) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),
  archiveEntry: (id) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.id === id ? { ...e, archived: true } : e
      ),
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((e) => e.id !== id),
    })),

  // Selection (multi-select)
  selectedEntryIds: new Set(),
  toggleSelectedEntry: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedEntryIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { selectedEntryIds: newSet };
    }),
  clearSelection: () => set({ selectedEntryIds: new Set() }),
  archiveSelected: () =>
    set((state) => ({
      entries: state.entries.map((e) =>
        state.selectedEntryIds.has(e.id) ? { ...e, archived: true } : e
      ),
      selectedEntryIds: new Set(),
    })),
  deleteSelected: () =>
    set((state) => ({
      entries: state.entries.filter((e) => !state.selectedEntryIds.has(e.id)),
      selectedEntryIds: new Set(),
    })),

  // View settings
  viewMode: "stack",
  setViewMode: (mode) => set({ viewMode: mode }),
  sortMode: "modified",
  setSortMode: (mode) => set({ sortMode: mode }),

  // UI state
  isCapturing: false,
  setIsCapturing: (value) => set({ isCapturing: value }),
  currentCardIndex: 0,
  setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
  editingEntry: null,
  setEditingEntry: (entry) => set({ editingEntry: entry }),
  editDrawerEntry: null,
  setEditDrawerEntry: (entry) => set({ editDrawerEntry: entry }),
}));
