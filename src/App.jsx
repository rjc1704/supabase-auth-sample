import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { useEffect } from "react";
import { getUser, signInWithEmail } from "./api/auth";

function App() {
  useEffect(() => {
    signInWithEmail();
  }, []);
  return (
    <div>
      <h1>이미지 포함된 포스트 작성</h1>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
