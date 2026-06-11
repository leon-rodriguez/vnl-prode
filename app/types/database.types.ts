export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      equipos: {
        Row: {
          created_at: string | null
          id: number
          imagen_url: string | null
          nombre: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          imagen_url?: string | null
          nombre: string
        }
        Update: {
          created_at?: string | null
          id?: number
          imagen_url?: string | null
          nombre?: string
        }
        Relationships: []
      }
      fases: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id?: number
          nombre: string
        }
        Update: {
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      grupos: {
        Row: {
          codigo_invitacion: string
          creador_id: string | null
          created_at: string | null
          id_grupo: string
          nombre: string
        }
        Insert: {
          codigo_invitacion: string
          creador_id?: string | null
          created_at?: string | null
          id_grupo?: string
          nombre: string
        }
        Update: {
          codigo_invitacion?: string
          creador_id?: string | null
          created_at?: string | null
          id_grupo?: string
          nombre?: string
        }
        Relationships: []
      }
      miembros_grupo: {
        Row: {
          fecha_union: string | null
          id_grupo: string | null
          id_miembro: string
          rol: string | null
          usuario_id: string | null
        }
        Insert: {
          fecha_union?: string | null
          id_grupo?: string | null
          id_miembro?: string
          rol?: string | null
          usuario_id?: string | null
        }
        Update: {
          fecha_union?: string | null
          id_grupo?: string | null
          id_miembro?: string
          rol?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miembros_grupo_id_grupo_fkey"
            columns: ["id_grupo"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id_grupo"]
          },
        ]
      }
      partidas: {
        Row: {
          eq_1_id: number
          eq_1_sets: number | null
          eq_2_id: number
          eq_2_sets: number | null
          fase_id: number | null
          fecha: string
          ganador_id: number | null
          id: number
        }
        Insert: {
          eq_1_id: number
          eq_1_sets?: number | null
          eq_2_id: number
          eq_2_sets?: number | null
          fase_id?: number | null
          fecha: string
          ganador_id?: number | null
          id?: number
        }
        Update: {
          eq_1_id?: number
          eq_1_sets?: number | null
          eq_2_id?: number
          eq_2_sets?: number | null
          fase_id?: number | null
          fecha?: string
          ganador_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "partidas_eq_1_id_fkey"
            columns: ["eq_1_id"]
            isOneToOne: false
            referencedRelation: "equipos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partidas_eq_2_id_fkey"
            columns: ["eq_2_id"]
            isOneToOne: false
            referencedRelation: "equipos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partidas_fase_id_fkey"
            columns: ["fase_id"]
            isOneToOne: false
            referencedRelation: "fases"
            referencedColumns: ["id"]
          },
        ]
      }
      predicciones: {
        Row: {
          acertada: boolean
          created_at: string | null
          eq_1_sets_pred: number
          eq_2_sets_pred: number
          id: number
          partida_id: number
          puntos_ganados: number
          usuario_id: string
        }
        Insert: {
          acertada?: boolean
          created_at?: string | null
          eq_1_sets_pred: number
          eq_2_sets_pred: number
          id?: number
          partida_id: number
          puntos_ganados?: number
          usuario_id: string
        }
        Update: {
          acertada?: boolean
          created_at?: string | null
          eq_1_sets_pred?: number
          eq_2_sets_pred?: number
          id?: number
          partida_id?: number
          puntos_ganados?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "predicciones_partida_id_fkey"
            columns: ["partida_id"]
            isOneToOne: false
            referencedRelation: "partidas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predicciones_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          created_at: string | null
          id: string
          nombre: string
          puntos: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          nombre: string
          puntos?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          nombre?: string
          puntos?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
