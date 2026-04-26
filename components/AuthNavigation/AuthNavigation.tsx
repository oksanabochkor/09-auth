"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  if (!isAuthenticated) {
    return (
      <nav className={css.nav}>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </nav>
    );
  }

  return (
    <nav className={css.nav}>
      <Link href="/profile">Profile</Link>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}