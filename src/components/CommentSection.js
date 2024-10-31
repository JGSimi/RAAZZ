// src/components/CommentSection.js
import React, { useState, useEffect } from "react";
import { db } from '../firebaseConfig';
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

const CommentSection = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from Firestore for the specific post
    const fetchComments = async () => {
      const commentsRef = collection(db, "posts", postId, "comments");
      const commentsSnapshot = await getDocs(commentsRef);
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());
      setComments(commentsList);
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const commentsRef = collection(db, "posts", postId, "comments");
      await addDoc(commentsRef, {
        username: "User",  // Replace with current user’s name
        text: newComment,
        timestamp: serverTimestamp()
      });
      setNewComment("");
      setComments(prevComments => [...prevComments, { username: "User", text: newComment }]); // Temporarily update
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lightGray text-sm font-semibold mb-2">Comentários</h3>
      <div className="space-y-2">
        {comments.map((comment, index) => (
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
