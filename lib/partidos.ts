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

export async function getPartidosConPrediccion(fecha: Date, usuarioId: string) {
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

  // 1. Traemos TODOS los partidos de la fecha con sus equipos
  const { data: partidas, error: errorPartidas } = await supabase
    .from("partidas")
    .select(
      `
      *,
      equipo1:equipos!eq_1_id(id, nombre, imagen_url),
      equipo2:equipos!eq_2_id(id, nombre, imagen_url)
    `,
    )
    .gte("fecha", inicio.toISOString())
    .lte("fecha", fin.toISOString())
    .order("fecha");

  if (errorPartidas) throw errorPartidas;

  // Si no hay partidos ese día, devolvemos un array vacío y no seguimos
  if (!partidas || partidas.length === 0) return [];

  // 2. Extraemos los IDs de esos partidos para buscar solo las predicciones de hoy
  const partidasIds = partidas.map((p) => p.id);

  // 3. Traemos SOLO las predicciones de ESTE usuario para ESTOS partidos
  const { data: predicciones, error: errorPred } = await supabase
    .from("predicciones")
    .select("eq_1_sets_pred, eq_2_sets_pred, partida_id")
    .eq("usuario_id", usuarioId)
    .in("partida_id", partidasIds);

  if (errorPred) throw errorPred;

  // 4. Cruzamos los datos (Merge)
  const partidosCompletos = partidas.map((partido) => {
    // Buscamos si el usuario apostó en este partido en particular
    const prediccionUsuario = predicciones?.find(
      (pred) => pred.partida_id === partido.id,
    );

    return {
      ...partido,
      // Si hay predicción la guardamos como un objeto simple, sino devolvemos null
      prediccion: prediccionUsuario || null,
    };
  });

  return partidosCompletos;
}
