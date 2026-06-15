"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, Crown, Users } from "lucide-react";
import { GrupoConAdmin } from "../types/models/grupos";

const GroupCard = ({ grupo }: { grupo: GrupoConAdmin }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (codigo: string) => {
    navigator.clipboard?.writeText(codigo);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };
  return (
    <article className="group flex flex-col gap-4 border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md bg-vnl-card rounded-2xl border border-slate-100 shadow-lg">
      {/* Header: name + role badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-pretty text-xl font-bold leading-tight text-foreground">
          {grupo.nombre}
        </h3>
        {grupo.esAdmin ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-amber-700">
            <Crown className="size-3.5" aria-hidden="true" />
            Creador
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-muted-foreground">
            Miembro
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-secondary/60 px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="size-3.5" aria-hidden="true" />
            <span className="text-xs font-medium">Participantes</span>
          </div>
          <p className="mt-0.5 text-lg font-black text-foreground">
            {/* {group.participants} */}
            {/* {grupo.} */}
          </p>
        </div>
        <div className="rounded-xl bg-secondary/60 px-3 py-2.5">
          <span className="text-xs font-medium text-muted-foreground">
            Tu posición
          </span>
          <p className="mt-0.5 text-lg font-black text-primary">
            {/* {group.position}° */}
            <span className="text-sm font-semibold text-muted-foreground">
              {" "}
              {/* / {group.participants} */}
            </span>
          </p>
        </div>
      </div>

      {/* Invite code box */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-2">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
            Código de invitación
          </p>
          <p className="font-mono text-sm font-bold tracking-[0.15em] text-foreground">
            {grupo.codigo_invitacion}
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleCopy(grupo.codigo_invitacion)}
          aria-label={`Copiar código ${grupo.codigo_invitacion}`}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-vnl-card text-vnl-text-main transition-colors duration-150 hover:border-primary hover:bg-gray-100 cursor-pointer"
        >
          {copied ? (
            <Check className="size-4 text-success" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Action button */}
      <button
        type="button"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-vnl-primary px-4 py-2.5 text-sm font-semibold  transition-colors hover:bg-vnl-primary-hover text-white cursor-pointer w-40 "
      >
        Ver Grupo
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </article>
  );
};

export default GroupCard;
