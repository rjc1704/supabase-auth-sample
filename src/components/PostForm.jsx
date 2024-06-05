import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getId } from "../api/auth";
import { createPost } from "../api/posts";
import { uploadFile } from "../api/storage";
import { addPost } from "../redux/slices/postSlice";

export default function PostForm() {
  const [postContent, setPostContent] = useState("");
  const [postImgFile, setPostImgFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const dispatch = useDispatch();

  const resetStates = useCallback(() => {
    setPostContent("");
    setPostImgFile(null);
    setPreviewUrl("");
  }, []);

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event) => {
    console.log("event.target:", event.target);
    console.log("handleImageChange-Files:", event.target.files);
    const fileObj = event.target.files[0];
    setPostImgFile(fileObj);
    const objectUrl = URL.createObjectURL(fileObj);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user_id = await getId();
    if (postImgFile) {
      // 사용자가 이미지 선택 했을 때
      uploadFile(postImgFile).then((img_url) => {
        createPost({
          content: postContent,
          user_id,
          img_url,
        }).then(([newPost]) => {
          dispatch(addPost(newPost));
          resetStates();
        });
      });
      return;
    }
    // 이미지 선택 안했을 때
    createPost({
      content: postContent,
      user_id,
    }).then(([newPost]) => {
      dispatch(addPost(newPost));
      resetStates();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid blue", width: 500, margin: "0 auto" }}
    >
      <div>
        <label>미리보기</label>
        {previewUrl ? (
          <img src={previewUrl} alt="미리보기 이미지" width={200} />
        ) : (
          <p>이미지 없음</p>
        )}
      </div>

      <div>
        <label htmlFor="postContent">내용:</label>
        <textarea
          id="postContent"
          value={postContent}
          onChange={handleContentChange}
        />
      </div>
      <div>
        <label htmlFor="postImage">이미지:</label>
        <input
          type="file"
          id="postImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">게시하기</button>
    </form>
  );
}
