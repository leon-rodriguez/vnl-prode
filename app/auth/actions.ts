// app/auth/actions.ts
"use server";

import { getSupabaseServer } from "@/utils/supabaseServer";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await getSupabaseServer();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  return redirect("/partidos");
}
export async function loginConGoogle() {
  const supabase = await getSupabaseServer();

  // Le pedimos a Supabase la URL de autenticación de Google
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // Esta es la URL de tu app local a donde Google va a redirigir al usuario
      redirectTo: "/auth/callback",
    },
  });

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Si Supabase nos devuelve la URL de Google, redirigimos al usuario allá
  if (data.url) {
    return redirect(data.url);
  }
}
export async function signup(formData: FormData) {
  const supabase = await getSupabaseServer();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nombre = formData.get("nombre") as string; // Si querés guardar su nombre

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Guardamos el nombre en los metadatos del usuario de Supabase
      data: { display_name: nombre },
    },
  });

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Si todo sale bien, podríamos insertar el usuario en nuestra tabla custom 'usuarios'
  if (data.user) {
    const { error: dbError } = await supabase
      .from("usuarios")
      .insert([{ id: data.user.id, nombre: nombre, puntos: 0 }]);
    if (dbError)
      console.error(
        "Error guardando usuario en tabla pública:",
        dbError.message,
      );
  }

  return redirect("/partidos");
}

export async function logout() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  return redirect("/");
}
