// lib/partidos.ts

import { supabase } from "../utils/supabaseClient";
import { PartidoConEquipos } from "@/app/types/models/partido";

export async function getPartidosDelDia(
  fecha: Date,
): Promise<PartidoConEquipos[]> {
  const inicio = new Date(
    Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0, 0),
  );
  const fin = new Date(
    Date.UTC(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      23,
      59,
      59,
    ),
  );

  const { data, error } = await supabase
    .from("partidas")
    .select(
      `
      *,
      equipo1:eq_1_id(id,nombre,imagen_url),
      equipo2:eq_2_id(id,nombre,imagen_url)
    `,
    )
    .gte("fecha", inicio.toISOString())
    .lte("fecha", fin.toISOString())
    .order("fecha");

  if (error) throw error;
  return (data as unknown as PartidoConEquipos[]) ?? [];
}
