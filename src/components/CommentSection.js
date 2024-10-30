// src/components/CommentSection.js
import React, { useState } from "react";

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(comments || []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = { username: "Você", text: newComment };
      setLocalComments([...localComments, newCommentObject]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lightGray text-sm font-semibold mb-2">Comentários</h3>
      <div className="space-y-2">
        {localComments.map((comment, index) => (
          <p key={index} className="text-gray-300 text-sm">
            <span className="font-semibold text-lightGray mr-2">{comment.username}:</span>
            {comment.text}
          </p>
        ))}
      </div>
      <div className="flex mt-2 space-x-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm"
          placeholder="Adicionar um comentário..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="text-blue-500 font-semibold" onClick={handleAddComment}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CommentSection;