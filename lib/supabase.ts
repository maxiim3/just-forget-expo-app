import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (to be generated from Supabase)
export type Entry = {
  id: string;
  user_id: string;
  content: string;
  raw_audio_url?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
  archived: boolean;
};

export type Label = {
  id: string;
  user_id: string;
  name: string;
  type: "space" | "tag" | "location" | "date";
  metadata?: Record<string, unknown>;
};

export type EntryLabel = {
  entry_id: string;
  label_id: string;
  created_at: string;
};
