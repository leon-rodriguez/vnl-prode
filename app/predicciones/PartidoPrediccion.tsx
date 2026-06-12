import { PartidoConEquipos } from "@/app/types/models/partido";
import Sets from "../../components/Sets";
import { useState } from "react";
import SetsPrediccion from "./SetsPrediccion";

const PartidoPrediccion = ({
  partido,
  index,
}: {
  partido: PartidoConEquipos;
  index: number;
}) => {
  const fechaObjeto = new Date(partido.fecha);
  const horaFormateada = fechaObjeto.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const [isPredictionLegal, setIsPredictionLegal] = useState<boolean>(false);

  return (
    <div
      key={index}
      className="shadow-lg w-full max-w-[700px] mx-auto bg-vnl-card rounded-2xl border border-slate-100 px-6 py-5  gap-6"
    >
      <div className="flex justify-center items-center sm:items-start text-center sm:text-left shrink-0 gap-2 mb-2">
        <span className="text-xs font-bold text-vnl-text-muted uppercase tracking-widest mb-1">
          Fase de Grupos
        </span>
        {partido.ganador_id ? (
          <span className="text-xs font-medium text-vnl-accent">
            Finalizado
          </span>
        ) : (
          <div className="text-xs font-bold text-vnl-text-muted">
            {horaFormateada}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="text-sm sm:text-base font-semibold text-vnl-text-main">
            {partido.equipo1?.nombre}
          </span>
          <img
            src={partido.equipo1?.imagen_url ?? undefined}
            alt={partido.equipo1?.nombre}
            className="w-15 h-10 object-cover border border-slate-100 shrink-0 shadow-lg"
          />
        </div>
        <SetsPrediccion
          partido={partido}
          onValidChange={setIsPredictionLegal}
        />
        <div className="flex items-center gap-3 flex-1 justify-start">
          <img
            src={partido.equipo2?.imagen_url ?? undefined}
            alt={partido.equipo2?.nombre}
            className="w-15 h-10 object-cover border border-slate-100 shrink-0 shadow-lg"
          />
          <span className="text-sm sm:text-base font-semibold text-vnl-text-main">
            {partido.equipo2?.nombre}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center pt-5">
        <button
          disabled={!isPredictionLegal}
          className="w-30 h-7 bg-vnl-primary text-white rounded-lg flex justify-center items-center cursor-pointer hover:bg-vnl-primary-hover transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default PartidoPrediccion;
