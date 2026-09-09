"use client";

import { PasswordField } from "./PasswordField";
import { useState } from "react";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const { showPassword, togglePassword } = usePasswordToggle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      setError("Email ou palavra-passe inválidos.");
      setPending(false);
      return;
    }
    router.replace(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <section>
      <section className="login-form">
        <div>
          <h1>Administrador</h1>
          <p className="mt-1">Painel Administrativo</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="admin@smbb.ao"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            
            <label>
              <span>Palavra-passe</span>
              <PasswordField
                value={password}
                onChange={setPassword}
                showPassword={showPassword}
                onToggle={togglePassword}
              />
            </label>
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="login-form-submit"
            disabled={pending}
          >
            {pending ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </section>
    </section>
  );
}
