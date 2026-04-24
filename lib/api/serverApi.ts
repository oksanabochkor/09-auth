import axios from "axios";
import { cookies } from "next/headers";

import type { NotesResponse } from "@/types/notes-response";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

// ✅ FIXED
const getHeaders = async () => {
  const cookieStore = await cookies();

  const cookie = cookieStore
    .getAll()
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  return {
    Cookie: cookie,
  };
};

const serverApi = axios.create({
  baseURL,
});

// ===== AUTH =====

export const checkSession = async (): Promise<User | null> => {
  try {
    const headers = await getHeaders();

    const res = await serverApi.get("/auth/session", {
      headers,
    });

    return res.data || null;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const headers = await getHeaders();

  const res = await serverApi.get("/users/me", {
    headers,
  });

  return res.data;
};

// ===== NOTES =====

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const headers = await getHeaders();

  const params: Record<string, unknown> = {
    search,
    page,
    perPage: 12,
  };

  if (tag) {
    params.tag = tag;
  }

  const res = await serverApi.get("/notes", {
    params,
    headers,
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getHeaders();

  const res = await serverApi.get(`/notes/${id}`, {
    headers,
  });

  return res.data;
};