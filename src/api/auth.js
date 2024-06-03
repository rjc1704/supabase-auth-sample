import { supabase } from "../supabase/supabaseClient";

export const signInWithEmail = async () => {
  // TODO: 로그인된 사람만 게시물 등록할 수 있게 해둔 코드입니다. Supabase Authentication 에서 임시로 email 을 만드시고
  // 아래 email, password를 본인 것으로 변경해서 사용하세요.
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
