"use server";

import { supabase } from "../utils/supabaseClient";
import { PrediccionInsert } from "@/app/types/models/prediccion";

export type Prediccion = {
  eq_1_sets_pred: number;
  eq_2_sets_pred: number;
  partida_id: number;
  usuario_id: string;
};

export async function guardarPrediccion(prediccion: Prediccion) {
  // Usamos upsert para que si el usuario ya había apostado en este partido,
  // simplemente se actualice su predicción anterior en vez de tirar error.
  const { data, error } = await supabase
    .from("predicciones")
    .upsert(
      {
        partida_id: prediccion.partida_id,
        usuario_id: prediccion.usuario_id,
        eq_1_sets_pred: prediccion.eq_1_sets_pred,
        eq_2_sets_pred: prediccion.eq_2_sets_pred,
      },
      {
        // Esto le dice a Supabase qué columnas mirar para saber si ya existe.
        // Asegurate de tener una clave única compuesta por estas dos columnas en tu tabla.
        onConflict: "partida_id, usuario_id",
      },
    )
    .select()
    .single();

  if (error) {
    console.error("Error al guardar la predicción:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// export async function getPartidosDelDia(
//   fecha: Date,
// ): Promise<Prediccion[]> {

//   const { data, error } = await supabase
//     .from("predicciones")
//     .select(
//       `
//       *,
//       equipo1:eq_1_id(id,nombre,imagen_url),
//       equipo2:eq_2_id(id,nombre,imagen_url)
//     `,
//     )
//     .gte("fecha", inicio.toISOString())
//     .lte("fecha", fin.toISOString())
//     .order("fecha");

//   if (error) throw error;
//   return (data as unknown as Prediccion[]) ?? [];
// }

// export async function insertPrediccion(prediccion: PrediccionInsert) {
//   const { data, error } = await supabase
//     .from("predicciones")
//     .insert(prediccion);

//   if (error) throw error;

//   return data;
// }
