"use client";
import { getPartidosDelDia } from "@/lib/partidos";
import { useEffect, useState } from "react";
import { PartidoConEquipos } from "@/app/types/models/partido";
import Partido from "./Partido";
import { usePathname } from "next/navigation";
import PartidoPrediccion from "@/app/predicciones/PartidoPrediccion";

const Partidos = ({ fecha }: { fecha: Date | undefined }) => {
  const pathname = usePathname();
  const esPrediccion = pathname === "/predicciones";
  const [partidos, setPartidos] = useState<PartidoConEquipos[]>([]);
  useEffect(() => {
    if (!fecha) return;
    getPartidosDelDia(fecha).then(setPartidos);
  }, [fecha]);

  return (
    <>
      {partidos.map((partido, index) =>
        esPrediccion ? (
          <PartidoPrediccion key={index} index={index} partido={partido} />
        ) : (
          <Partido
            partido={partido}
            index={index}
            key={index}
            esPrediccion={esPrediccion}
          />
        ),
      )}
    </>
  );
};

export default Partidos;
