import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// Lazy-load client for client-side operations
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null
export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL and Anon Key are required')
    }

    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// For backwards compatibility
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (target, prop) => {
    return getSupabase()[prop as keyof ReturnType<typeof createClient<Database>>]
  }
})

// Lazy-load admin client for server-side operations with service role key
let supabaseAdminInstance: ReturnType<typeof createClient<Database>> | null = null
export function getSupabaseAdmin() {
  if (!supabaseAdminInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase URL and Service Role Key are required')
    }

    supabaseAdminInstance = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return supabaseAdminInstance
}

// For backwards compatibility
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (target, prop) => {
    return getSupabaseAdmin()[prop as keyof ReturnType<typeof createClient<Database>>]
  }
})

// Database types
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type TicketInsert = Database['public']['Tables']['tickets']['Insert']
export type TicketUpdate = Database['public']['Tables']['tickets']['Update']

export type AdminConfig = Database['public']['Tables']['admin_config']['Row']
export type AdminConfigInsert = Database['public']['Tables']['admin_config']['Insert']
export type AdminConfigUpdate = Database['public']['Tables']['admin_config']['Update']
