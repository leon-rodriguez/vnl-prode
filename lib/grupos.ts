"use server";
import { supabase } from "../utils/supabaseClient";
import { revalidatePath } from "next/cache";
import {
  RespuestaObtenerGrupos,
  GrupoConAdmin,
} from "@/app/types/models/grupos";

// Función auxiliar para generar un código aleatorio amigable
function generarCodigoCorto(longitud = 6): string {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (let i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

export async function crearGrupo(nombre: string, creadorId: string) {
  if (!nombre || nombre.trim() === "") {
    return { success: false, error: "El nombre del grupo es obligatorio." };
  }

  try {
    // Generamos el código único de invitación
    const codigoInvitacion = `${generarCodigoCorto()}`;

    // PASO 1: Insertamos en la tabla de grupos
    const { data: nuevoGrupo, error: errorGrupo } = await supabase
      .from("grupos")
      .insert({
        nombre: nombre.trim(),
        codigo_invitacion: codigoInvitacion,
        creador_id: creadorId,
      })
      .select()
      .single();

    if (errorGrupo) {
      if (errorGrupo.code === "23505") {
        return {
          success: false,
          error: "Hubo un problema de colisión de códigos, volvé a intentar.",
        };
      }
      return { success: false, error: errorGrupo.message };
    }

    // PASO 2: Insertamos al creador en la tabla miembros_grupo
    const { error: errorMiembro } = await supabase
      .from("miembros_grupo")
      .insert({
        id_grupo: nuevoGrupo.id_grupo,
        usuario_id: creadorId,
      });

    if (errorMiembro) {
      return {
        success: false,
        error:
          "Grupo creado, pero falló al agregarte como miembro: " +
          errorMiembro.message,
      };
    }

    revalidatePath("/grupos"); // Refrescamos la vista
    return { success: true, data: nuevoGrupo };
  } catch (error) {
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}

export async function getGrupos(
  userId: string,
): Promise<RespuestaObtenerGrupos> {
  if (!userId) {
    return { grupos: [], error: "No autenticado" };
  }

  const { data: grupos, error } = await supabase
    .from("miembros_grupo")
    .select(
      `
      grupos (
        id_grupo,
        nombre,
        codigo_invitacion,
        creador_id,
        created_at
      )
    `,
    )
    .eq("usuario_id", userId);

  if (error) {
    return { grupos: [], error: error.message };
  }

  const gruposConRol = (grupos?.map((g) => ({
    ...g.grupos,
    esAdmin: g.grupos?.creador_id === userId,
  })) ?? []) as GrupoConAdmin[];

  return { grupos: gruposConRol, error: null };
}

export async function unirseGrupo(codigoInvitacion: string, usuarioId: string) {
  if (!codigoInvitacion || codigoInvitacion.trim() === "") {
    return { success: false, error: "El código de invitación es obligatorio." };
  }
  if (!usuarioId) {
    return { success: false, error: "No autenticado." };
  }

  try {
    const { data: grupo, error: errorGrupo } = await supabase
      .from("grupos")
      .select("id_grupo, nombre")
      .eq("codigo_invitacion", codigoInvitacion.trim().toUpperCase())
      .maybeSingle();

    if (errorGrupo) {
      return { success: false, error: errorGrupo.message };
    }

    if (!grupo) {
      return {
        success: false,
        error: "No se encontró ningún grupo con ese código. Revisalo bien.",
      };
    }

    const { error: errorMiembro } = await supabase
      .from("miembros_grupo")
      .insert({
        id_grupo: grupo.id_grupo,
        usuario_id: usuarioId,
      });

    if (errorMiembro) {
      if (errorMiembro.code === "23505") {
        return {
          success: false,
          error: `Ya pertenecés al grupo "${grupo.nombre}".`,
        };
      }
      return { success: false, error: errorMiembro.message };
    }

    revalidatePath("/grupos");

    return { success: true, data: grupo };
  } catch (error) {
    return {
      success: false,
      error: "Ocurrió un error inesperado al intentar unirse.",
    };
  }
}
