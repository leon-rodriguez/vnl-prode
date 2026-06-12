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
      <span>{partido.eq_1_sets}</span>
      <span className="text-slate-300 font-light mx-1">-</span>
      <span>{partido.eq_2_sets}</span>
    </div>
  );
};

export default Sets;
