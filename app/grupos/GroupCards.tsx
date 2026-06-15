"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, Crown, Users } from "lucide-react";
import { GrupoConAdmin } from "../types/models/grupos";
import GroupCard from "./GroupCard";

const GroupCards = ({ grupos }: { grupos: GrupoConAdmin[] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (codigo: string) => {
    navigator.clipboard?.writeText(codigo);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {grupos.map((grupo, index) => (
        <GroupCard key={index} grupo={grupo} />
      ))}
    </div>
  );
};

export default GroupCards;
