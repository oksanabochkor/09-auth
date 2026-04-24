import { api } from "../api";
import type { NotesResponse } from "@/types/notes-response";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

// ================= AUTH =================

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
    return res.data || null;
  } catch {
    return null;
  }
};

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

// ================= NOTES =================

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const params: Record<string, unknown> = {
    search,
    page,
    perPage: 12,
  };

  if (tag) {
    params.tag = tag;
  }

  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
