"use client";
import { getPartidosConPrediccion } from "@/lib/partidos";
import { useEffect, useState, useCallback } from "react";
import { PartidoConPrediccion } from "@/app/types/models/partido";
import PartidoPrediccion from "@/app/predicciones/PartidoPrediccion";

const PartidosPrediccion = ({
  fecha,
  userId,
}: {
  fecha: Date | undefined;
  userId: string | undefined;
}) => {
  const [partidos, setPartidos] = useState<PartidoConPrediccion[]>([]);

  useEffect(() => {
    if (!fecha || !userId) return;
    getPartidosConPrediccion(fecha, userId).then((data) => {
      setPartidos(data);
    });
  }, [fecha]);

  const refrescarPartidos = useCallback(() => {
    if (!fecha || !userId) return;
    getPartidosConPrediccion(fecha, userId).then((data) => {
      setPartidos(data);
    });
  }, [fecha, userId]);

  // Se ejecuta cuando cambia la fecha o el usuario
  useEffect(() => {
    refrescarPartidos();
  }, [refrescarPartidos]);

  return (
    <>
      {partidos.map((partido, index) => (
        <PartidoPrediccion
          key={index}
          index={index}
          partido={partido}
          userId={userId}
          onRefresh={refrescarPartidos}
        />
      ))}
    </>
  );
};

export default PartidosPrediccion;
