import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { useEffect } from "react";
import {
  deleteUser,
  getId,
  getUser,
  signInWithEmail,
  signOut,
  signUp,
  updateDisplayName,
} from "./api/auth";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const { isLogin } = useContext(AuthContext);
  return (
    <div>
      <h1>이미지 포함된 포스트 작성</h1>
      <div>
        <h2>현재로그인상태</h2>
        {isLogin ? "로그인 중" : "로그아웃 중"}
      </div>
      <button
        onClick={() => {
          signUp({ email: "rjc1704@gmail.com" });
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          signInWithEmail();
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
      <button
        onClick={() => {
          getUser();
        }}
      >
        유저정보가져오기
      </button>
      <button
        onClick={() => {
          updateDisplayName("변경된닉네임");
        }}
      >
        displayName 변경
      </button>
      <button
        onClick={() => {
          getId();
        }}
      >
        ID 가져오기
      </button>
      <button
        onClick={() => {
          deleteUser();
        }}
      >
        회원탈퇴
      </button>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
