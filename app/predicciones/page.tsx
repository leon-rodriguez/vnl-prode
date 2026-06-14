import VistaPartidos from "@/components/VistaPartidos";
import { getSupabaseServer } from "@/utils/supabaseServer";
import VistaPartidosPrediccion from "./VistaPartidosPrediccion";
const page = async () => {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans space-y-10 pt-10">
      <VistaPartidosPrediccion userId={user?.id} />
    </div>
  );
};

export default page;
