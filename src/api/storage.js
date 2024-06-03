import { supabase } from "../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (file) => {
  const { data: avatarData, error } = await supabase.storage
    .from("avatar")
    .upload(`public/${uuidv4()}.png`, file);

  if (error) {
    console.log(error);
    return;
  }

  const { data } = supabase.storage
    .from("avatar")
    .getPublicUrl(avatarData.path);

  return data.publicUrl;
};
