import { supabase } from "../supabase/supabaseClient";

// TODO: 로그인된 사람만 게시물 등록할 수 있게 해둔 코드입니다. Supabase Authentication 에서 임시로 email 을 만드시고
// 아래 email, password를 본인 것으로 변경해서 사용하세요.
export const signInWithEmail = async ({
  email = "example@gmail.com",
  password = "example-password",
}) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return;
  }
  console.log("data in signin:", data);
};

// auth.users.raw_user_meta_data 컬럼에 options.data 객체를 json 형식으로 저장합니다.
export const signUp = async ({
  email = "example@gmail.com",
  password = "example-password",
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName: "이거슨닉네임",
        first_name: "John",
        age: 27,
      },
    },
  });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return console.log(error);
  console.log("로그아웃 완료");
};

export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) console.log("getUser error:", error);
  return user;
};

export const getId = async () => {
  const {
    data: {
      session: {
        user: { id },
      },
    },
    error,
  } = await supabase.auth.getSession();
  console.log(id);
  return id;
};

export const updateDisplayName = async (displayName = "홍길동") => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      displayName,
    },
  });

  if (error) {
    console.error("Error updating display name:", error);
  } else {
    console.log("Display name updated:", data);
  }
};

// TODO: Database Function 으로 SQL Editor을 통해 delete_user 를 생성한 경우만 유효한 코드입니다.
export const deleteUser = async () => {
  const user_id = await getId();
  const { data, error } = await supabase.rpc("delete_user", { user_id });
  if (error) {
    console.error("Error:", error.message);
  }
  console.log("Result from RPC:", data);
  await signOut();
};
