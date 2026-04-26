import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/serverApi";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug?.join(" / ") || "All notes";

  return {
    title: `Notes filtered by: ${filter} | NoteHub`,
    description: `Browse notes filtered by ${filter}`,
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug?.[0];

  const queryClient = new QueryClient();

  // ✅ prefetch (це вимагає ДЗ)
  const notesResponse = await fetchNotes("", 1, tag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        {/* ✅ передаємо notes, як очікує твій NoteList */}
        <NoteList notes={notesResponse.notes} />
      </main>
    </HydrationBoundary>
  );
}

