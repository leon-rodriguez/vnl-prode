import { Database } from "../database.types";
import { Equipo } from "./equipo";

export type Partido = Database["public"]["Tables"]["partidas"]["Row"];

export type PartidoConEquipos = Partido & {
  equipo1: Equipo | null;
  equipo2: Equipo | null;
};
