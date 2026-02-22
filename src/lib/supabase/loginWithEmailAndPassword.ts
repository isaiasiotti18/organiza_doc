import { supabase } from "./supabase";

interface LoginWithEmailAndPasswordSupabase {
  email: string;
  password: string;
}

export async function loginWithEmailAndPasswordSupabase({
  email,
  password,
}: LoginWithEmailAndPasswordSupabase) {
  const { data: result, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Email/Senha inválidos.");
  }

  return result;
}
