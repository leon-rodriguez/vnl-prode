const Partido = ({ partido, index }: { partido: any; index: number }) => {
  return (
    <div
      key={index}
      className="shadow-lg w-full max-w-[700px] mx-auto bg-vnl-card rounded-2xl border border-slate-100 px-6 py-5  gap-6"
    >
      <div className="flex justify-center items-center sm:items-start text-center sm:text-left shrink-0 gap-2 mb-2">
        <span className="text-xs font-bold text-vnl-text-muted uppercase tracking-widest mb-1">
          Fase de Grupos
        </span>
        <span className="text-xs font-medium text-vnl-accent">Finalizado</span>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="text-sm sm:text-base font-semibold text-vnl-text-main">
            {partido.equipo1.nombre}
          </span>
          <img
            src={partido.equipo1.imagen_url}
            alt={partido.equipo1.nombre}
            className="w-15 h-10 object-cover border border-slate-100 shrink-0 shadow-lg"
          />
        </div>

        <div className="text-2xl sm:text-3xl font-black text-vnl-text-main shrink-0 flex justify-between gap-4">
          {partido.eq_1_sets}{" "}
          <span className="text-slate-400 font-light mx-1">-</span>
          {partido.eq_2_sets}
        </div>

        <div className="flex items-center gap-3 flex-1 justify-start">
          <img
            src={partido.equipo2.imagen_url}
            alt={partido.equipo2.nombre}
            className="w-15 h-10 object-cover border border-slate-100 shrink-0 shadow-lg"
          />
          <span className="text-sm sm:text-base font-semibold text-vnl-text-main">
            {partido.equipo2.nombre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Partido;
