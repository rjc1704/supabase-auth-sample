import { supabase } from "../supabase/supabaseClient";

export const signInWithEmail = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: "abc@gmail.com",
    password: "123123",
  });
  if (error) {
    console.log(error);
    return;
  }
  console.log("data:", data);
};

export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    return;
  }
  return user;
};
