import { create } from "zustand";
import { apiGetNotes } from "../utils/apiCalls";

const notesLocalStorage = import.meta.env.VITE_NOTES_LOCAL_STORAGE as string;

export type Note = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  associatedtaskid: string | null;
};

type NoteStore = {
  notes: Note[];
  loadNotes: (page: number, pageSize: number) => void;
  getNotes: () => Note[];
  getNote: (id: string) => Note | undefined;
  setNotes: (notes: Note[]) => void;
  createNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
};

export const useNoteStore = create<NoteStore>()((set, get) => ({
  notes: [],
  loadNotes: (page: number, pageSize: number) => {
    apiGetNotes(page, pageSize)
      .then((response) => {
        set({ notes: [...get().notes, ...response.data] });
      })
      .catch((_) => {
      });
  },
  getNotes: () => get().notes,
  getNote: (id: string) => get().notes.find((n) => n.id === id),
  setNotes: (notes: Note[]) => set({ notes }),
  createNote: (note: Note) => {
    set({ notes: [...get().notes, note] });
  },
  updateNote: (note: Note) => {
    set({
      notes: get().notes.map((n) => (n.id === note.id ? note : n)),
    });
  },
  deleteNote: (id: string) => {
    set({ notes: get().notes.filter((n) => n.id !== id) });
  },
}));
