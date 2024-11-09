export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      customers: {
        Row: {
          country: string | null
          created_at: string | null
          customer_name: string | null
          deactivated_at: string | null
          discount: number | null
          email: string | null
          group_id: string | null
          house_number: string | null
          id: string
          is_active: boolean | null
          postcode: string | null
          reference: string | null
          street_name: string | null
          town: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          customer_name?: string | null
          deactivated_at?: string | null
          discount?: number | null
          email?: string | null
          group_id?: string | null
          house_number?: string | null
          id?: string
          is_active?: boolean | null
          postcode?: string | null
          reference?: string | null
          street_name?: string | null
          town?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          customer_name?: string | null
          deactivated_at?: string | null
          discount?: number | null
          email?: string | null
          group_id?: string | null
          house_number?: string | null
          id?: string
          is_active?: boolean | null
          postcode?: string | null
          reference?: string | null
          street_name?: string | null
          town?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          country: string | null
          created_at: string | null
          email: string | null
          group_name: string
          house_number: string | null
          id: string
          postcode: string | null
          standard_discount: number | null
          street_name: string | null
          town: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          email?: string | null
          group_name: string
          house_number?: string | null
          id?: string
          postcode?: string | null
          standard_discount?: number | null
          street_name?: string | null
          town?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          email?: string | null
          group_name?: string
          house_number?: string | null
          id?: string
          postcode?: string | null
          standard_discount?: number | null
          street_name?: string | null
          town?: string | null
        }
        Relationships: []
      }
      items: {
        Row: {
          created_at: string | null
          id: number
          item_name: string | null
          loaned_out: number | null
          price: number | null
          stock: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          item_name?: string | null
          loaned_out?: number | null
          price?: number | null
          stock?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          item_name?: string | null
          loaned_out?: number | null
          price?: number | null
          stock?: number | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: number
          item_id: number | null
          order_id: string | null
          picked: boolean | null
          price: number | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          order_id?: string | null
          picked?: boolean | null
          price?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          order_id?: string | null
          picked?: boolean | null
          price?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          delivery_date: string | null
          discount: number | null
          group_id: string | null
          id: string
          notes: string | null
          number: number
          status: Database["public"]["Enums"]["order_status"] | null
          total: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          discount?: number | null
          group_id?: string | null
          id?: string
          notes?: string | null
          number?: never
          status?: Database["public"]["Enums"]["order_status"] | null
          total?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          discount?: number | null
          group_id?: string | null
          id?: string
          notes?: string | null
          number?: never
          status?: Database["public"]["Enums"]["order_status"] | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      standard_order: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: number
          order_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: never
          order_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: never
          order_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "standard_order_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      standard_order_items: {
        Row: {
          created_at: string | null
          custom_price: number | null
          id: number
          item_id: number | null
          quantity: number
          standard_order_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_price?: number | null
          id?: never
          item_id?: number | null
          quantity: number
          standard_order_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_price?: number | null
          id?: never
          item_id?: number | null
          quantity?: number
          standard_order_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "standard_order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standard_order_items_standard_order_id_fkey"
            columns: ["standard_order_id"]
            isOneToOne: false
            referencedRelation: "standard_order"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_picking_list_by_date_range: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          item_id: number
          item_name: string
          total_number: number
          orders_unpicked: Json
          orders_picked: Json
        }[]
      }
      get_weekly_total: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: number
      }
    }
    Enums: {
      order_status: "pending" | "paid" | "sent" | "overdue"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

