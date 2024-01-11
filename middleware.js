import { NextResponse } from 'next/server';
import { createSupabaseReqResClient } from './utils/supabaseReqResClient';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createSupabaseReqResClient(req, res);

  return res;
}
