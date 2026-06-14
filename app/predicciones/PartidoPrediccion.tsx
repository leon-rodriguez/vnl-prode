import { PartidoConPrediccion } from "@/app/types/models/partido";
import { useState, useCallback } from "react";
import SetsPrediccion from "./SetsPrediccion";
import { guardarPrediccion } from "@/lib/predicciones";
import toast from "react-hot-toast";

type LegalAndSets = {
  legal: boolean;
  eq1sets: number;
  eq2sets: number;
};

const PartidoPrediccion = ({
  partido,
  index,
  userId,
  onRefresh,
}: {
  partido: PartidoConPrediccion;
  index: number;
  userId: string | undefined;
  onRefresh: () => void;
}) => {
  const fechaObjeto = new Date(partido.fecha);
  const horaFormateada = fechaObjeto.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const [isPredictionLegal, setIsPredictionLegal] = useState<LegalAndSets>({
    legal: false,
    eq1sets: 0,
    eq2sets: 0,
  });
  const handleValidChange = useCallback(
    (legal: boolean, eq1sets: number, eq2sets: number) => {
      setIsPredictionLegal((prev) => {
        // Protección extra: si los valores son idénticos a los de antes,
        // no actualizamos el estado para evitar re-renders innecesarios.
        if (
          prev.legal === legal &&
          prev.eq1sets === eq1sets &&
          prev.eq2sets === eq2sets
        ) {
          return prev;
        }
        return { legal, eq1sets, eq2sets };
      });
    },
    [],
  ); // Array vacío para que se cree una sola vez al montar el componente

  const [cargando, setCargando] = useState(false);

  const handleSavePrediction = async () => {
    if (!userId) return;
    setCargando(true);
    try {
      const prediccion = {
        // Usamos Number() por seguridad para asegurar el tipo de dato correcto
        eq_1_sets_pred: Number(isPredictionLegal.eq1sets),
        eq_2_sets_pred: Number(isPredictionLegal.eq2sets),
        partida_id: partido.id,
        usuario_id: userId,
      };

      // Llamamos a la función de Supabase
      const resultado = await guardarPrediccion(prediccion);

      if (resultado.success) {
        toast.success("¡Predicción guardada!");
        onRefresh();
      } else {
        toast.error(`No se pudo guardar: ${resultado.error}`);
      }
    } catch (error) {
      console.error("Error inesperado en el front:", error);
      toast.error("Ocurrió un error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

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
        <SetsPrediccion partido={partido} onValidChange={handleValidChange} />
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
        {partido.prediccion === null || partido.prediccion === undefined ? (
          <button
            disabled={!isPredictionLegal.legal || cargando}
            onClick={handleSavePrediction}
            className="w-30 h-7 bg-vnl-primary text-white rounded-lg flex justify-center items-center cursor-pointer hover:bg-vnl-primary-hover transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {cargando ? "Guardando..." : "Confirmar"}
          </button>
        ) : (
          <span className="text-sm text-slate-400 font-medium">Registrado</span>
        )}
      </div>
    </div>
  );
};

export default PartidoPrediccion;
