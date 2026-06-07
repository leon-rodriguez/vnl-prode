export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans space-y-10 pt-10">
      <div className=" shadow-lg max-w-2xl mx-auto bg-vnl-card rounded-2xl border border-slate-100 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-6 ">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left shrink-0">
          <span className="text-[10px] font-bold text-vnl-text-muted uppercase tracking-widest mb-1">
            Fase de Grupos
          </span>
          <span className="text-xs font-medium text-vnl-accent">
            Finalizado
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-sm sm:text-base font-semibold text-vnl-text-main">
              Argentina
            </span>
            <img
              src="https://flagcdn.com/w80/ar.png"
              alt="Argentina"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-100 shrink-0 shadow-sm"
            />
          </div>

          <div className="text-2xl sm:text-3xl font-black text-vnl-text-main shrink-0">
            3 <span className="text-slate-200 font-light mx-1">-</span> 1
          </div>

          <div className="flex items-center gap-3 flex-1 justify-start">
            <img
              src="https://flagcdn.com/w80/br.png"
              alt="Brasil"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-100 shrink-0 shadow-sm"
            />
            <span className="text-sm sm:text-base font-semibold text-vnl-text-main">
              Brasil
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
