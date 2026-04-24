import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ✅ ДОДАЙ ЦЕ
export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};




