import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../api/posts";
import { AuthContext } from "../context/AuthProvider";
import { setPosts } from "../redux/slices/postSlice";
import PostItem from "./PostItem";

export default function PostList() {
  const posts = useSelector((state) => state.posts);
  const { isLogin } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts().then((posts) => dispatch(setPosts(posts)));
  }, [isLogin]);

  return (
    <ul style={{ border: "1px solid red", padding: 12 }}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
