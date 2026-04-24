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
    <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    <p className={css.error}>Error</p>
  </form>
</main>

  );
}