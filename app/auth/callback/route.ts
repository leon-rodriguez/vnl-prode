// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabaseServer";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Si todo sale bien, lo mandamos a /partidos. Si no, a donde diga el parámetro 'next'
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await getSupabaseServer();

    // Intercambiamos el código de Google por una sesión real de Supabase
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Si la sesión se creó bien, lo redirigimos a la página de los partidos
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si algo falla o no hay código, lo mandamos al login con un mensaje de error
  return NextResponse.redirect(
    `${origin}/login?error=No se pudo iniciar sesion con Google`,
  );
}
