"use client";

import { PasswordField } from "./PasswordField";
import { useState } from "react";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";

export function LoginForm() {
  const { showPassword, togglePassword } = usePasswordToggle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="login-container">
      <section className="login-form">
        <div>
          <h1>Administrador</h1>
          <p className="mt-1">Painel Administrativo</p>
        </div>
        <form>
          <div className="grid gap-5">
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="makenedev@gmal.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="login-form-submit">
            Entrar
          </button>
        </form>
      </section>
    </section>
  );
}
