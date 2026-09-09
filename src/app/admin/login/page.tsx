import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="login-page">
      <Suspense fallback={null}>
        <section className="login-container">
          <div className="login-fire flex flex-col justify-between p-4 text-white">
            <div />

            <div>
              <h1 className="2xl:text-xl font-semibold">
                SMBB - Comércio e Serviços, (SU), LDA
              </h1>
              <p className="text-sm text-gray-300">
                SMBB oferece equipamentos e serviços premium de segurança contra incêndios em Angola.
              </p>
            </div>
          </div>

          <LoginForm />
        </section>
      </Suspense>
    </main>
  );
}
