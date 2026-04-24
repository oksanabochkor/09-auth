import axios from "axios";
import type { Note } from "@/types/note";
import type { NotesResponse } from "@/types/notes-response";
import type { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const api = axios.create({
  baseURL,
  withCredentials: true, // 🔥 важливо для cookies
});

// ===== AUTH =====

export const register = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const res = await api.get("/auth/session");
    return res.data;
  } catch {
    return null;
  }
};

// ===== USER =====

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: {
  username: string;
}): Promise<User> => {
  const res = await api.patch("/users/me", data);
  return res.data;
};

// ===== NOTES =====

export const fetchNotes = async (
  search = "",
  page = 1,
  tag?: string
): Promise<NotesResponse> => {
  const res = await api.get("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
