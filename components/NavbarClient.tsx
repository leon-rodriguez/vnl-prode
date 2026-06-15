"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

export default function NavbarClient({
  user,
  fotoPerfil,
  nombreUsuario,
  logout,
}: {
  user: User | null;
  fotoPerfil?: string;
  nombreUsuario?: string;
  logout: () => Promise<never>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Partidos" },
    { href: "/predicciones", label: "Predicciones" },
    { href: "/grupos", label: "Grupos" },
  ];

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
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-vnl-text-main hover:text-vnl-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt={`Avatar de ${nombreUsuario}`}
                    className="w-10 h-10 rounded-full border border-slate-300 object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-vnl-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => logout()}
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

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-vnl-text-muted hover:text-vnl-primary"
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-vnl-card">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-vnl-text-main hover:text-vnl-primary px-3 py-2 text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex-col items-center justify-between  px-3 py-2">
                <div className="flex items-center gap-3">
                  {fotoPerfil ? (
                    <img
                      src={fotoPerfil}
                      alt={`Avatar de ${nombreUsuario}`}
                      className="w-9 h-9 rounded-full border border-slate-300 object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-vnl-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-vnl-text-main truncate max-w-[150px]">
                    {nombreUsuario}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="border mt-4 border-slate-500 text-slate-500 rounded-lg text-sm font-semibold cursor-pointer h-8 px-4"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-vnl-primary text-white hover:bg-vnl-primary-hover px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer text-center mt-2"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
