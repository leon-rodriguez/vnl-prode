"use client";
import { getPartidosDelDia } from "@/lib/partidos";
import { useEffect, useState } from "react";
import { PartidoConEquipos } from "@/app/types/models/partido";
import Partido from "./Partido";

const Partidos = ({ fecha }: { fecha: Date | undefined }) => {
  const [partidos, setPartidos] = useState<PartidoConEquipos[]>([]);
  useEffect(() => {
    if (!fecha) return;
    getPartidosDelDia(fecha).then(setPartidos);
  }, [fecha]);

  return (
    <>
      {partidos.map((partido, index) => (
        <Partido partido={partido} index={index} key={index} />
      ))}
    </>
  );
};

export default Partidos;
