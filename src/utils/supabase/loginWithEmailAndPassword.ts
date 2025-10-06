import { supabase } from "./supabase";

interface LoginWithEmailAndPasswordSupabase {
  email: string;
  password: string;
}

export const loginWithEmailAndPasswordSupabase = async ({
  email,
  password,
}: LoginWithEmailAndPasswordSupabase) => {
  const { data } = await supabase
    .from("users")
    .select("email")
    .eq("email", email) // the email to check if it exists
    .single();

  // throw an error if a record is found.
  if (!data) {
    throw new Error("Email/Senha invalidos.");
  }

  const { data: result, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Error signing up: ${error}`);
  }

  if (result) {
    return result;
  }
};
