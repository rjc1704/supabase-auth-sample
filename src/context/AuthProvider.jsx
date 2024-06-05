import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { supabase } from "../supabase/supabaseClient";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (session) {
        // 로그인 상태로 변경
        setIsLogin(true);
      } else {
        // 로그아웃 상태로 변경
        setIsLogin(false);
      }
    });

    // 전역적으로 사용될 경우 구독해제가 필수적이지는 않음.
    return () => subscription.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
