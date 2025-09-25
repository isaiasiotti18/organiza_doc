import { supabase } from "./supabase";

interface NewUserSupabase {
  email: string;
  password: string;
  name: string;
}

export const newUserSupabase = async ({
  name,
  email,
  password,
}: NewUserSupabase) => {
  const { data } = await supabase
    .from("users")
    .select("email")
    .eq("email", email) // the email to check if it exists
    .single();

  // throw an error if a record is found.
  if (data) {
    throw new Error(
      "Este email ele já está registrado. Por favor faça login ou resete sua senha.",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    console.log(error);
    console.error("Error signing up: ", error);
    return { success: false, error };
  }

  return { success: true, data };
};
