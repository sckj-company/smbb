import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="login-page">
      <Suspense fallback={null}>
        <section className="login-container">
          <div className="login-fire flex flex-col justify-between p-4 text-white">
            <Image
              src="/smbb-logo-dark-transparent.png"
              alt="SMBB Logo"
              width="200"
              height="100"
              className="h-8 sm:h-6.5 xl:h-7.5 w-fit"
            />

            <div>
              <h1 className="2xl:text-xl font-semibold">
                SMBB - Comércio e Serviços, (SU), LDA
              </h1>
              <p className="text-sm text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <LoginForm />
        </section>
      </Suspense>
    </main>
  );
}
