import { Database } from "../database.types";

export type Prediccion = Database["public"]["Tables"]["predicciones"]["Row"];
export type PrediccionInsert =
  Database["public"]["Tables"]["predicciones"]["Insert"];
