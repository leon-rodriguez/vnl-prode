import { Partido } from "@/app/types/models/partido";

const Sets = ({
  partido,
  esPrediccion,
}: {
  partido: Partido;
  esPrediccion: boolean;
}) => {
  return (
    <div className="text-2xl sm:text-3xl font-black text-vnl-text-main shrink-0 flex justify-between gap-4">
      {esPrediccion ? (
        // SI ES PREDICCIÓN: Mostramos los inputs
        <div className="flex items-center">
          <input
            type="number"
            name="prediccion_local"
            defaultValue={partido.eq_1_sets ?? ""}
            className="w-12 h-10 text-center text-xl sm:text-2xl font-bold border-b-2 border-slate-300 focus:outline-none focus:border-vnl-primary transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] "
          />
          <span className="text-slate-300 font-light mx-1">-</span>
          <input
            type="number"
            min={0}
            max={3}
            name="prediccion_visitante"
            defaultValue={partido.eq_2_sets ?? ""}
            className="w-12 h-10 text-center text-xl sm:text-2xl font-bold border-b-2 border-slate-300 focus:outline-none focus:border-vnl-primary transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
        </div>
      ) : (
        // SI NO ES PREDICCIÓN: Mostramos los números estáticos
        <>
          <span>{partido.eq_1_sets}</span>
          <span className="text-slate-300 font-light mx-1">-</span>
          <span>{partido.eq_2_sets}</span>
        </>
      )}
    </div>
  );
};

export default Sets;
