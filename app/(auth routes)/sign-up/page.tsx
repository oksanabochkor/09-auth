"use client";

import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await register({ email, password });

      router.push("/profile"); // ✅ редірект
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input name="email" />
        <input name="password" />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}