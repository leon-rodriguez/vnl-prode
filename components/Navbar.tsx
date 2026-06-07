import Link from "next/link";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { logout } from "@/app/auth/actions"; // Ahora creamos esta acción

export default async function Navbar() {
  const supabase = await getSupabaseServer();
  // Pedimos los datos del usuario actual a Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fotoPerfil = user?.user_metadata?.avatar_url;
  const nombreUsuario = user?.user_metadata?.full_name || user?.email;
  return (
    <nav className="bg-vnl-card border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-vnl-primary"
            >
              VNL PRODE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link
              href="/predicciones"
              className="text-vnl-text-main hover:text-vnl-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Predicciones
            </Link>
            <Link
              href="/grupos"
              className="text-vnl-text-main hover:text-vnl-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Grupos
            </Link>
            {user ? (
              <>
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt={`Avatar de ${nombreUsuario}`}
                    className="w-10 h-10 rounded-full border border-slate-300 object-cover shadow-sm"
                    referrerPolicy="no-referrer" // Clave para que Google permita cargar la imagen desde localhost
                  />
                ) : (
                  // Por si se loguea con mail tradicional y no tiene foto, dejamos un avatar genérico
                  <div className="w-10 h-10 rounded-full bg-vnl-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={logout}
                  className="border border-slate-500 text-slate-500 rounded-lg text-sm font-semibold cursor-pointer h-8 w-28"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-vnl-primary text-white hover:bg-vnl-primary-hover px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button (placeholder) */}
          <div className="sm:hidden flex items-center">
            <button className="text-vnl-text-muted hover:text-vnl-primary">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
