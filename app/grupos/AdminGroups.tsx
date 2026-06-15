"use client";

import { useState } from "react";
import { LogIn, Plus } from "lucide-react";
// Importamos tu Server Action (ajustá la ruta si es distinta)
import { crearGrupo, unirseGrupo } from "@/lib/grupos";
import toast from "react-hot-toast";

// 1. Recibimos el userId por props desde el componente padre
export function AdminGroups({ userId }: { userId?: string }) {
  const [groupName, setGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const [isCreating, setIsCreating] = useState(false);

  const handleCrearGrupo = async () => {
    if (!groupName.trim() || !userId) return;
    setIsCreating(true);
    const res = await crearGrupo(groupName, userId);
    setIsCreating(false);
    if (res.success && res.data) {
      toast.success("¡Grupo creado con éxito!");
      setGroupName("");
    } else {
      toast.error(res.error || "Ocurrió un error al crear el grupo.");
    }
  };

  const handleUnirseGrupo = async () => {
    if (!joinCode.trim() || !userId) return;

    setIsJoining(true);
    const res = await unirseGrupo(joinCode, userId);
    setIsJoining(false);

    if (res.success && res.data) {
      toast.success(`¡Te uniste con éxito a ${res.data.nombre}!`);
      setJoinCode(""); // Limpiás el input
    } else {
      toast.error(res.error || "Error al unirse al grupo.");
    }
  };

  return (
    <section
      aria-label="Acciones rápidas"
      className="grid gap-4 sm:grid-cols-2 "
    >
      {/* Card A: Create group */}
      <div className="flex flex-col gap-4 border-border bg-card p-5 bg-vnl-card rounded-2xl border border-slate-100 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-foreground">Crear Grupo</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Armá tu propia competencia e invitá a tus amigos.
          </p>
        </div>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Ej: Los Pibes del Vóley 🏐"
          aria-label="Nombre del grupo"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
        <button
          type="button"
          onClick={handleCrearGrupo}
          disabled={!groupName.trim() || isCreating}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-vnl-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vnl-primary-hover focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-white"
        >
          <Plus className="size-4" aria-hidden="true" />
          {isCreating ? "Creando..." : "Crear Grupo"}
        </button>
      </div>

      {/* Card B: Join group */}
      <div className="flex flex-col gap-4 border-border bg-card p-5 bg-vnl-card rounded-2xl border border-slate-100 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Unirse a un Grupo
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            ¿Tenés un código de invitación? Sumate en segundos.
          </p>
        </div>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          placeholder="Ej: VNLX7R2"
          aria-label="Código de invitación"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm font-mono uppercase tracking-[0.2em] text-foreground placeholder:tracking-[0.2em] placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
        <button
          type="button"
          disabled={!joinCode.trim() || isJoining}
          onClick={handleUnirseGrupo}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-500 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/1 hover:text-accent-foreground focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          <LogIn className="size-4" aria-hidden="true" />
          Unirse
        </button>
      </div>
    </section>
  );
}
