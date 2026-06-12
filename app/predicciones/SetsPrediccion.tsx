import { Partido } from "@/app/types/models/partido";
import { useRef, useState } from "react";

const SetsPrediccion = ({
  partido,
  onValidChange,
}: {
  partido: Partido;
  onValidChange: (valid: boolean) => void;
}) => {
  const equipo1SetsValid = useRef<number | null>(null);
  const equipo2SetsValid = useRef<number | null>(null);

  const [isPredictionLegal, setIsPredictionLegal] = useState<boolean>(false);

  const setEquipo1 = (sets: number) => {
    equipo1SetsValid.current = sets;
  };

  const setEquipo2 = (sets: number) => {
    equipo2SetsValid.current = sets;
  };

  const handleValidar = (
    sets: string,
    setEqSets: (correct: number) => void,
  ) => {
    const setsParsed = parseInt(sets);
    setEqSets(setsParsed);

    if (equipo1SetsValid.current == null || equipo2SetsValid.current == null) {
      return;
    }
    if (
      (equipo1SetsValid.current === 3 &&
        equipo2SetsValid.current < 3 &&
        equipo2SetsValid.current > -1) ||
      (equipo2SetsValid.current === 3 &&
        equipo1SetsValid.current < 3 &&
        equipo1SetsValid.current > -1)
    ) {
      onValidChange(true);
    }
  };

  return (
    <div className="text-2xl sm:text-3xl font-black text-vnl-text-main shrink-0 flex justify-between gap-4">
      <div className="flex items-center">
        <input
          type="number"
          min={0}
          max={3}
          maxLength={1}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
          }}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (isNaN(val) || val < 0) {
              e.target.value = "0";
            } else if (val > 3) {
              e.target.value = "3";
              handleValidar(e.target.value, setEquipo1);
            } else {
              e.target.value = String(val).slice(0, 1);
              handleValidar(e.target.value, setEquipo1);
            }
          }}
          name="prediccion_local"
          defaultValue={partido.eq_1_sets ?? ""}
          className="w-12 h-10 text-center text-xl sm:text-2xl font-bold border-b-2 border-slate-300 focus:outline-none focus:border-vnl-primary transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] "
        />
        <span className="text-slate-300 font-light mx-1">-</span>
        <input
          type="number"
          min={0}
          max={3}
          maxLength={1}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
          }}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (isNaN(val) || val < 0) {
              e.target.value = "0";
            } else if (val > 3) {
              e.target.value = "3";
              handleValidar(e.target.value, setEquipo2);
            } else {
              e.target.value = String(val).slice(0, 1);
              handleValidar(e.target.value, setEquipo2);
            }
          }}
          name="prediccion_visitante"
          defaultValue={partido.eq_2_sets ?? ""}
          className="w-12 h-10 text-center text-xl sm:text-2xl font-bold border-b-2 border-slate-300 focus:outline-none focus:border-vnl-primary transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
        />
      </div>
    </div>
  );
};

export default SetsPrediccion;
