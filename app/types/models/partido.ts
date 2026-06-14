import { Database } from "../database.types";
import { Equipo } from "./equipo";

export type Partido = Database["public"]["Tables"]["partidas"]["Row"];

export type PartidoConEquipos = Partido & {
  equipo1: Equipo | null;
  equipo2: Equipo | null;
};

export type PartidoConPrediccion = PartidoConEquipos & {
  prediccion: {
    eq_1_sets_pred: number;
    eq_2_sets_pred: number;
    partida_id: number;
  } | null;
};
