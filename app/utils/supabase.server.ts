import { createServerClient, parse, serialize } from '@supabase/ssr';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env.server';

export function createClient(request: Request) {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const headers = new Headers();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append('Set-Cookie', serialize(key, value, options));
      },
      remove(key, options) {
        headers.append('Set-Cookie', serialize(key, '', options));
      },
    },
  });
}
