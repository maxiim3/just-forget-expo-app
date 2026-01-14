import { useMemo } from "react";
import { create } from "zustand";
import type { Entry } from "./supabase";

type ViewMode = "stack" | "grid";
type SortMode = "modified" | "alphabetical";

export interface FilterState {
  query: string;
  tags: string[];
  showArchived: boolean;
}

interface AppState {
  // Entries
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  addEntry: (entry: Entry) => void;
  updateEntry: (id: string, updates: Partial<Entry>) => void;
  archiveEntry: (id: string) => void;
  unarchiveEntry: (id: string) => void;
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

  // Command/Filter state
  commandInput: string;
  setCommandInput: (input: string) => void;
  activeFilter: FilterState;
  setActiveFilter: (filter: Partial<FilterState>) => void;
  clearFilter: () => void;
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
  unarchiveEntry: (id) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.id === id ? { ...e, archived: false } : e
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

  // Command/Filter state
  commandInput: "",
  setCommandInput: (input) => set({ commandInput: input }),
  activeFilter: {
    query: "",
    tags: [],
    showArchived: false,
  },
  setActiveFilter: (filter) =>
    set((state) => ({
      activeFilter: { ...state.activeFilter, ...filter },
    })),
  clearFilter: () =>
    set({
      activeFilter: { query: "", tags: [], showArchived: false },
    }),
}));

/**
 * Selector hook for filtered entries based on activeFilter state.
 * Filters by search query and tags.
 */
export function useFilteredEntries() {
  const entries = useAppStore((state) => state.entries);
  const filter = useAppStore((state) => state.activeFilter);

  return useMemo(() => {
    let result = entries;

    // Filter archived
    if (!filter.showArchived) {
      result = result.filter((e) => !e.archived);
    }

    // Filter by tags
    if (filter.tags.length > 0) {
      result = result.filter((e) =>
        filter.tags.some((tag) =>
          e.content.toLowerCase().includes(`#${tag.toLowerCase()}`)
        )
      );
    }

    // Filter by search query
    if (filter.query) {
      const q = filter.query.toLowerCase();
      result = result.filter((e) => e.content.toLowerCase().includes(q));
    }

    return result;
  }, [entries, filter]);
}
