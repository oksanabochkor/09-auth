"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

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
      <>
        <a href="/sign-in">Login</a>
        <a href="/sign-up">Register</a>
      </>
    );
  }

  return (
    <>
      <a href="/profile">Profile</a>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}