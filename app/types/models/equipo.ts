import { Database } from "../database.types";

type EquipoBase = Database["public"]["Tables"]["equipos"]["Row"];

export type Equipo = Omit<EquipoBase, "created_at">;
