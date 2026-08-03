import { supabase } from "./supabase";

export async function signIn(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data.user;
}

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) throw error;
}

export async function getCurrentSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export function onAuthStateChange(
  callback: Parameters<
    typeof supabase.auth.onAuthStateChange
  >[0]
) {
  return supabase.auth.onAuthStateChange(callback);
}