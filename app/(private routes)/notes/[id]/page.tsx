import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetails from "@/app/(private routes)/notes/[id]/NoteDetails.client";

type Params = {
  id: string;
};

export async function generateMetadata(
  params: Promise<Params>
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 100),
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content?.slice(0, 100),
        url: `https://09-auth-one-phi.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "This note does not exist",
    };
  }
}

// ✅ ВИПРАВЛЕНА СТОРІНКА
export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  // 🔥 PREFETCH
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}

