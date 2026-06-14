import { PartidoConPrediccion } from "@/app/types/models/partido";
import { useState, useEffect } from "react";

const SetsPrediccion = ({
  partido,
  onValidChange,
}: {
  partido: PartidoConPrediccion;
  onValidChange: (legal: boolean, eq1sets: number, eq2sets: number) => void;
}) => {
  const [eq1, setEq1] = useState<string>("");
  const [eq2, setEq2] = useState<string>("");

  useEffect(() => {
    // Si ya existe una predicción guardada en la BD, nos aseguramos de apagar el botón del padre
    if (partido.prediccion !== null && partido.prediccion !== undefined) {
      onValidChange(false, 0, 0);
      return;
    }

    const n1 = parseInt(eq1);
    const n2 = parseInt(eq2);

    // Si alguno está vacío o no es un número, es inválido
    if (isNaN(n1) || isNaN(n2)) {
      onValidChange(false, 0, 0);
      return;
    }

    // Reglas del vóley (uno llega a 3, el otro tiene entre 0 y 2)
    const esValido =
      (n1 === 3 && n2 >= 0 && n2 < 3) || (n2 === 3 && n1 >= 0 && n1 < 3);

    if (esValido) {
      onValidChange(true, n1, n2);
    } else {
      // SI DEJA DE SER VÁLIDO, LE AVISAMOS AL PADRE PARA DESHABILITAR EL BOTÓN
      onValidChange(false, 0, 0);
    }
  }, [eq1, eq2, partido.prediccion, onValidChange]);

  const handleInputChange = (valStr: string, setVal: (v: string) => void) => {
    if (valStr === "") {
      setVal("");
      return;
    }
    let val = parseInt(valStr);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 3) val = 3;
    setVal(String(val));
  };

  return (
    <div className="text-2xl sm:text-3xl font-black text-vnl-text-main shrink-0 flex justify-between gap-4">
      <div className="flex items-center">
        {partido.prediccion !== null && partido.prediccion !== undefined ? (
          <div className="text-2xl sm:text-3xl font-black text-orange-400 shrink-0 flex justify-between gap-4">
            <span>{partido.prediccion.eq_1_sets_pred}</span>
            <span className="text-slate-300 font-light mx-1">-</span>
            <span>{partido.prediccion.eq_2_sets_pred}</span>
          </div>
        ) : (
          <>
            <input
              type="number"
              min={0}
              max={3}
              value={eq1} // Componente controlado
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => handleInputChange(e.target.value, setEq1)}
              name="prediccion_local"
              placeholder="0"
              className="w-12 h-10 text-center text-xl sm:text-2xl font-bold border-b-2 border-slate-300 focus:outline-none focus:border-vnl-primary transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] "
            />
            <span className="text-slate-300 font-light mx-1">-</span>
            <input
              type="number"
              min={0}
              max={3}
              value={eq2} // Componente controlado
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => handleInputChange(e.target.value, setEq2)}
              name="prediccion_visitante"
              placeholder="0"
              className="w-12 h-10 text-center text-xl sm:text-2xl font-bold border-b-2 border-slate-300 focus:outline-none focus:border-vnl-primary transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SetsPrediccion;
