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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    console.error("Error signing up: ", error);
    return { success: false, error };
  }

  return { success: true, data };
};
