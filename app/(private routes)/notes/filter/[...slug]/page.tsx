interface Props {
  params: { slug: string[] };
}

export default function FilterSlugPage({ params }: Props) {
  return <div>Filter: {params.slug.join("/")}</div>;
}