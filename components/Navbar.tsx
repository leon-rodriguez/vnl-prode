import Link from "next/link";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { logout } from "@/app/auth/actions";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fotoPerfil = user?.user_metadata?.avatar_url;
  const nombreUsuario = user?.user_metadata?.full_name || user?.email;

  return (
    <NavbarClient
      user={user}
      fotoPerfil={fotoPerfil}
      nombreUsuario={nombreUsuario}
      logout={logout}
    />
  );
}
