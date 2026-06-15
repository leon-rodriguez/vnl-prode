import { Database } from "../database.types";

export type Grupo = Database["public"]["Tables"]["grupos"]["Row"];

export type GrupoConAdmin = Grupo & {
  esAdmin: boolean;
};
export type RespuestaObtenerGrupos =
  | { grupos: never[]; error: string }
  | { grupos: GrupoConAdmin[]; error: null };
