import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <main>{children}</main>
      <aside>{sidebar}</aside>
    </div>
  );
}
