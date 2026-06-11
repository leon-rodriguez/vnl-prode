import { PartidoConEquipos } from "@/app/types/models/partido";
import Sets from "./Sets";

const Partido = ({
  partido,
  index,
  esPrediccion,
}: {
  partido: PartidoConEquipos;
  index: number;
  esPrediccion: boolean;
}) => {
  const fechaObjeto = new Date(partido.fecha);
  const horaFormateada = fechaObjeto.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
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
        <Sets partido={partido} esPrediccion={esPrediccion} />
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
    </div>
  );
};

export default Partido;
