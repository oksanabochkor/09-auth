import Link from "next/link";

export default function Sidebar() {
  return (
    <aside>
      <h2>Filters</h2>

      <ul>
        <li>
          <Link href="/notes/filter/all">All notes</Link>
        </li>
        <li>
          <Link href="/notes/filter/work">Work</Link>
        </li>
        <li>
          <Link href="/notes/filter/personal">Personal</Link>
        </li>
      </ul>
    </aside>
  );
}