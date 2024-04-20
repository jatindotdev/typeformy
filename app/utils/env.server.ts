import { object, parse, string } from "valibot";

const EnvSchema = object({
  SUPABASE_URL: string("SUPABASE_URL is missing in .env"),
  SUPABASE_ANON_KEY: string("SUPABASE_ANON_KEY is missing in .env"),
});

export const { SUPABASE_URL, SUPABASE_ANON_KEY } = parse(
  EnvSchema,
  process.env
);
