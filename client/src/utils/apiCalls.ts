import axios from "axios";
import { Note } from "../state/noteStore";
import { Task } from "../state/taskStore";

const server = import.meta.env.VITE_SERVER as string;

// -------------------------------- Notes --------------------------------

export const apiGetNotes = async () => {
    return await axios.get(server + "/notes");
}

export const apiGetNote = async (id: string) => {
    return await axios.get(server + `/notes/${id}`);
}

export const apiPostNote = async (note: Note) => {
    return await axios.post(server + `/notes/create`, note);
}

export const apiPatchNote = async (note: Note) => {
    return await axios.patch(server + `/notes/${note.id}`, note);
}

export const apiDeleteNote = async (id: string) => {
    return await axios.delete(server + `/notes/${id}`);
}

// -------------------------------- Tasks --------------------------------

export const apiGetTasks = async () => {
    return await axios.get(server + "/tasks");
}

export const apiGetTask = async (id: string) => {
    return await axios.get(server + `/tasks/${id}`);
}

export const apiPostTask = async (task: Task) => {
    return await axios.post(server + `/tasks/create`, task);
}

export const apiPatchTask = async (task: Task) => {
    return await axios.patch(server + `/tasks/${task.id}`, task);
}

export const apiDeleteTask = async (id: string) => {
    return await axios.delete(server + `/tasks/${id}`);
}