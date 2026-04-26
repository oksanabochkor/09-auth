"use client";

import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkSession(); // ✅ тільки перевірка

        const user = await getMe(); // ✅ отримуємо юзера окремо
        setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}