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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      products: {
        Row: {
          added_date: string | null
          buildin_link: string | null
          category: string
          created_at: string | null
          description_en: string
          description_ru: string
          discount_end_date: string | null
          discount_percent: number | null
          display_on_home: boolean | null
          features_en: Json | null
          features_ru: Json | null
          full_description_en: string | null
          full_description_ru: string | null
          icon: string
          id: string
          image: string | null
          is_visible: boolean | null
          link: string | null
          popularity: number | null
          price: string
          price_value: number
          promo_text: string | null
          status: string
          title_en: string
          title_ru: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          added_date?: string | null
          buildin_link?: string | null
          category?: string
          created_at?: string | null
          description_en: string
          description_ru: string
          discount_end_date?: string | null
          discount_percent?: number | null
          display_on_home?: boolean | null
          features_en?: Json | null
          features_ru?: Json | null
          full_description_en?: string | null
          full_description_ru?: string | null
          icon?: string
          id: string
          image?: string | null
          is_visible?: boolean | null
          link?: string | null
          popularity?: number | null
          price: string
          price_value?: number
          promo_text?: string | null
          status?: string
          title_en: string
          title_ru: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          added_date?: string | null
          buildin_link?: string | null
          category?: string
          created_at?: string | null
          description_en?: string
          description_ru?: string
          discount_end_date?: string | null
          discount_percent?: number | null
          display_on_home?: boolean | null
          features_en?: Json | null
          features_ru?: Json | null
          full_description_en?: string | null
          full_description_ru?: string | null
          icon?: string
          id?: string
          image?: string | null
          is_visible?: boolean | null
          link?: string | null
          popularity?: number | null
          price?: string
          price_value?: number
          promo_text?: string | null
          status?: string
          title_en?: string
          title_ru?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      public_reviews: {
        Row: {
          author_name: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_visible: boolean | null
          rating: number
          review_text: string
          updated_at: string | null
        }
        Insert: {
          author_name: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_visible?: boolean | null
          rating?: number
          review_text: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_visible?: boolean | null
          rating?: number
          review_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      template_faq: {
        Row: {
          answer_en: string | null
          answer_ru: string
          created_at: string
          id: string
          question_en: string | null
          question_ru: string
          sort_order: number | null
          template_id: string
          updated_at: string
        }
        Insert: {
          answer_en?: string | null
          answer_ru: string
          created_at?: string
          id?: string
          question_en?: string | null
          question_ru: string
          sort_order?: number | null
          template_id: string
          updated_at?: string
        }
        Update: {
          answer_en?: string | null
          answer_ru?: string
          created_at?: string
          id?: string
          question_en?: string | null
          question_ru?: string
          sort_order?: number | null
          template_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      template_landings: {
        Row: {
          created_at: string
          created_by: string | null
          features: Json | null
          headline: string
          id: string
          main_image: string | null
          pain_points: Json | null
          screenshots: Json | null
          seo_description_en: string | null
          seo_description_ru: string | null
          seo_keywords: string | null
          seo_title_en: string | null
          seo_title_ru: string | null
          solution_description: string | null
          solution_intro: string | null
          subheadline: string | null
          target_audience: Json | null
          template_id: string
          updated_at: string
          video_url: string | null
          views: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          features?: Json | null
          headline: string
          id?: string
          main_image?: string | null
          pain_points?: Json | null
          screenshots?: Json | null
          seo_description_en?: string | null
          seo_description_ru?: string | null
          seo_keywords?: string | null
          seo_title_en?: string | null
          seo_title_ru?: string | null
          solution_description?: string | null
          solution_intro?: string | null
          subheadline?: string | null
          target_audience?: Json | null
          template_id: string
          updated_at?: string
          video_url?: string | null
          views?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          features?: Json | null
          headline?: string
          id?: string
          main_image?: string | null
          pain_points?: Json | null
          screenshots?: Json | null
          seo_description_en?: string | null
          seo_description_ru?: string | null
          seo_keywords?: string | null
          seo_title_en?: string | null
          seo_title_ru?: string | null
          solution_description?: string | null
          solution_intro?: string | null
          subheadline?: string | null
          target_audience?: Json | null
          template_id?: string
          updated_at?: string
          video_url?: string | null
          views?: Json | null
        }
        Relationships: []
      }
      template_reviews: {
        Row: {
          author_avatar: string | null
          author_name: string
          created_at: string
          id: string
          is_featured: boolean | null
          is_visible: boolean | null
          rating: number
          review_text_en: string | null
          review_text_ru: string
          source_link: string | null
          template_id: string
          updated_at: string
        }
        Insert: {
          author_avatar?: string | null
          author_name: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          rating?: number
          review_text_en?: string | null
          review_text_ru: string
          source_link?: string | null
          template_id: string
          updated_at?: string
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          rating?: number
          review_text_en?: string | null
          review_text_ru?: string
          source_link?: string | null
          template_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      template_tag_relations: {
        Row: {
          tag_id: string
          template_id: string
        }
        Insert: {
          tag_id: string
          template_id: string
        }
        Update: {
          tag_id?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_tag_relations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "template_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      template_tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name_en: string | null
          name_ru: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name_en?: string | null
          name_ru: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name_en?: string | null
          name_ru?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_reviews_visible: {
        Row: {
          author_name: string | null
          created_at: string | null
          id: string | null
          is_approved: boolean | null
          is_visible: boolean | null
          rating: number | null
          review_text: string | null
        }
        Insert: {
          author_name?: string | null
          created_at?: string | null
          id?: string | null
          is_approved?: boolean | null
          is_visible?: boolean | null
          rating?: number | null
          review_text?: string | null
        }
        Update: {
          author_name?: string | null
          created_at?: string | null
          id?: string | null
          is_approved?: boolean | null
          is_visible?: boolean | null
          rating?: number | null
          review_text?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_all_public_template_landings: {
        Args: never
        Returns: {
          created_at: string
          features: Json
          headline: string
          id: string
          main_image: string
          pain_points: Json
          screenshots: Json
          seo_description_en: string
          seo_description_ru: string
          seo_keywords: string
          seo_title_en: string
          seo_title_ru: string
          solution_description: string
          solution_intro: string
          subheadline: string
          target_audience: Json
          template_id: string
          updated_at: string
          video_url: string
          views: Json
        }[]
      }
      get_public_template_landing: {
        Args: { p_template_id: string }
        Returns: {
          created_at: string
          features: Json
          headline: string
          id: string
          main_image: string
          pain_points: Json
          screenshots: Json
          seo_description_en: string
          seo_description_ru: string
          seo_keywords: string
          seo_title_en: string
          seo_title_ru: string
          solution_description: string
          solution_intro: string
          subheadline: string
          target_audience: Json
          template_id: string
          updated_at: string
          video_url: string
          views: Json
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
