// app/login/page.tsx
import { login, signup, loginConGoogle } from "../auth/actions";

interface LoginProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginProps) {
  const { error } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 bg-vnl-bg">
      <div className="max-w-md w-full space-y-8 bg-vnl-card p-8 rounded-2xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <span className="text-4xl">🏐</span>
          <h2 className="mt-4 text-3xl font-black text-vnl-text-main">
            Ingresá a <span className="text-vnl-primary">VNL Prode</span>
          </h2>
          <p className="mt-2 text-sm text-vnl-text-muted">
            Pronosticá los partidos de la Volleyball Nations League
          </p>
        </div>

        <form className="mt-8 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-vnl-error text-sm p-3 rounded-lg font-medium text-center">
              ⚠️ {decodeURIComponent(error)}
            </div>
          )}

          {/* BOTÓN DE GOOGLE (Ahora conectado a la Server Action) */}
          <button
            formAction={loginConGoogle}
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-vnl-text-main font-semibold py-2.5 px-4 rounded-lg border border-slate-200 transition-colors shadow-sm text-sm cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.281 1.051 15.52 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"
              />
            </svg>
            Iniciar sesión con Google
          </button>

          {/* <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-vnl-card px-2 text-vnl-text-muted">
                O usar cuenta local
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-vnl-text-main mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-vnl-text-main focus:outline-none focus:border-vnl-primary text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-vnl-text-main mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-vnl-text-main focus:outline-none focus:border-vnl-primary text-sm"
              />
            </div>
          </div> */}

          {/* <div className="flex flex-col gap-3 pt-2">
            <button
              formAction={login}
              className="w-full bg-vnl-primary hover:bg-vnl-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <button
              formAction={signup}
              className="w-full bg-slate-100 hover:bg-slate-200 text-vnl-text-main font-semibold py-3 px-4 rounded-lg transition-colors text-sm cursor-pointer"
            >
              Crear Cuenta con Email
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
