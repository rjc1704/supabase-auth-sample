import { supabase } from "../supabase/supabaseClient";

export const getPosts = async () => {
  const { data: posts, error } = await supabase.from("posts").select("*");

  console.log("posts:", posts);
  console.log("error:", error);
  if (error) {
    console.log(error);
    return;
  }
  return posts;
};

export const createPost = async ({ content, img_url = null, user_id }) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .insert({ content, img_url, user_id })
    .select("*");
  console.log("posts in createPost:", posts);
  if (error) {
    console.log(error);
    return;
  }
  return posts;
};
