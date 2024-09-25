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
          discount: number | null
          email: string | null
          group_id: string | null
          house_number: string | null
          id: string
          postcode: string | null
          reference: string | null
          street_name: string | null
          town: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          customer_name?: string | null
          discount?: number | null
          email?: string | null
          group_id?: string | null
          house_number?: string | null
          id?: string
          postcode?: string | null
          reference?: string | null
          street_name?: string | null
          town?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          customer_name?: string | null
          discount?: number | null
          email?: string | null
          group_id?: string | null
          house_number?: string | null
          id?: string
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
      invoice_items: {
        Row: {
          created_at: string | null
          id: number
          invoice_id: string | null
          item_id: number | null
          price: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          invoice_id?: string | null
          item_id?: number | null
          price?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          invoice_id?: string | null
          item_id?: number | null
          price?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_id: string | null
          due_date: string | null
          id: string
          number: number | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          total: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          number?: number | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          total?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          number?: number | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      invoice_status: "pending" | "paid" | "sent" | "overdue"
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

