import { GroupHeader } from "./GroupHeader";
import VistaGrupos from "./VistaGrupos";
import { getSupabaseServer } from "@/utils/supabaseServer";

export default async function GruposPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <VistaGrupos userId={user?.id} />
    </div>
  );
}
