// components/VistaPartidos.tsx
"use client";

import { useEffect, useState } from "react";
import SelectorFecha from "@/components/SelectorFecha";
import PartidosPrediccion from "./PartidosPrediccion";

export default function VistaPartidosPrediccion({
  userId,
}: {
  userId: string | undefined;
}) {
  const [fecha, setFecha] = useState<Date | undefined>(undefined);
  useEffect(() => {
    const hoy = new Date();
    setFecha(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()));
  }, []);
  return (
    <>
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-3xl font-bold text-vnl-text-main text-center">
          Siguientes partidos
        </h1>

        <p className="text-sm text-vnl-text-muted mt-1 text-center">
          {" "}
          {fecha?.toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>
      <PartidosPrediccion fecha={fecha} userId={userId} />
      <SelectorFecha fecha={fecha} onFechaChange={setFecha} />
    </>
  );
}
