import { create } from "zustand";
import axios from "axios";

const server = import.meta.env.VITE_SERVER as string;

export type Note = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
};

type NoteStore = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  createNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
};

export const useNoteStore = create<NoteStore>()(
    (set, get) => ({
      notes: [],
      setNotes: (notes: Note[]) => set({ notes }),
      createNote: (note: Note) => {
        axios
          .post(server + `/notes/create`, note)
          .then((response) => {
            set({ notes: [...get().notes, response.data] });
          })
          .catch((error) => {
            window.alert(`An error occurred: ${error.message}`);
          });
      },
      updateNote: (note: Note) => {
        axios
          .patch(server + `/notes/${note.id}`, note)
          .then((response) => {
            set({
              notes: get().notes.map((n) =>
                n.id === response.data.id ? note : n
              ),
            });
          })
          .catch((error) => {
            window.alert(`An error occurred: ${error.message}`);
          });
      },
      deleteNote: (id: string) => {
        axios
          .delete(server + `/notes/${id}`)
          .then(() => {
            set({ notes: get().notes.filter((n) => n.id !== id) });
          })
          .catch((error) => {
            window.alert(`An error occurred: ${error.message}`);
          });
      },
    }),
);
