import { AdminGroups } from "./AdminGroups";
import GroupCards from "./GroupCards";
import { GroupHeader } from "./GroupHeader";
import { getGrupos } from "@/lib/grupos";
const VistaGrupos = async ({ userId }: { userId?: string }) => {
  const res = userId
    ? await getGrupos(userId)
    : { grupos: [], error: "No autenticado" };
  console.log(res.grupos);

  return (
    <div className="space-y-10">
      <GroupHeader cantGrupos={res.grupos.length} />
      <AdminGroups userId={userId} />
      <GroupCards grupos={res.grupos} />
    </div>
  );
};

export default VistaGrupos;
