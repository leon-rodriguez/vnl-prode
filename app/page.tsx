import VistaPartidos from "@/components/VistaPartidos";
import { getPartidosDelDia } from "@/lib/partidos";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ fecha?: string }>;
}) {
  const params = await searchParams;

  const fecha = params.fecha ?? new Date().toISOString().split("T")[0];

  // const partidos = await getPartidosDelDia(new Date(fecha));
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans space-y-10 pt-10">
      <VistaPartidos />
      {/* <SelectorFecha fechaInicial={fecha} /> */}
    </div>
  );
}
