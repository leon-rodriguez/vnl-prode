"use client";

export default function SelectorFecha({
  fecha,
  onFechaChange,
}: {
  fecha: Date | undefined;
  onFechaChange: (fecha: Date | undefined) => void;
}) {
  const diaAnterior = () => {
    if (!fecha) return;
    const nueva = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate() - 1,
    );
    onFechaChange(nueva);
  };

  const diaSiguiente = () => {
    if (!fecha) return;
    const nueva = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate() + 1,
    );
    onFechaChange(nueva);
  };

  const fechaFormateada = fecha?.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex items-center gap-6 mt-10 mb-8">
      <button
        onClick={diaAnterior}
        className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center cursor-pointer"
      >
        ←
      </button>

      <div className="text-center">
        <p className="text-xs uppercase tracking-wider text-vnl-text-muted">
          Día seleccionado
        </p>

        <p className="font-semibold text-vnl-text-main capitalize">
          {fechaFormateada}
        </p>
      </div>

      <button
        onClick={diaSiguiente}
        className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center cursor-pointer"
      >
        →
      </button>
    </div>
  );
}
