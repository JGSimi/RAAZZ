// src/components/Post.js
import React, { useState } from "react";
import CommentSection from "./CommentSection";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLikes(likes + 1); // Incrementa os likes localmente
  };

  return (
    <div className="post overflow-hidden max-w-full inline-flex flex-col justify-center">
      <img src={post.imageUrl} alt="post" className="max-w-full h-64 object-cover" />
      <div className="p-4">
        <p className="text-lightGray">{post.description}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button onClick={handleLike} className="text-blue-500 font-semibold">
            Curtir ({likes})
          </button>
        </div>
        <CommentSection comments={post.comments} />
      </div>
    </div>
  );
};

export default Post;
