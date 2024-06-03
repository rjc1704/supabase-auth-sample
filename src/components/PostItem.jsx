export default function PostItem({ post }) {
  return (
    <li key={post.id} style={{ border: "1px solid green" }}>
      {post.img_url && <img src={post.img_url} width={200} />}
      <p>{post.content}</p>
    </li>
  );
}
