import { Trophy, Users } from "lucide-react";

export function GroupHeader({ cantGrupos }: { cantGrupos: number }) {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Trophy className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Prode
          </span>
        </div>
        <h1 className="text-pretty text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Mis Grupos de Prode
        </h1>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Gestioná tus competencias, invitá a tus amigos y seguí tu posición en
          cada tabla. ¡Que gane el que más sabe!
        </p>
      </div>

      <div className="flex shrink-0 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
          <span className="flex size-9 items-center justify-center rounded-lg bg-black/5 text-primary">
            <Users className="size-4" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-lg font-black text-foreground">{cantGrupos}</p>
            <p className="text-xs font-medium text-muted-foreground">Grupos</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
          <span className="flex size-9 items-center justify-center rounded-lg bg-black/5 text-accent">
            <Trophy className="size-4" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-lg font-black text-foreground">
              {/* #{userStats.globalRank} */} 4
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              Puesto global
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
