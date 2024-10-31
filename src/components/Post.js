// src/components/Post.js
import React, { useState, useEffect } from "react";
import { doc, collection, getDoc, getDocs, updateDoc, setDoc, deleteDoc } from "firebase/firestore"; // Added getDocs
import { db } from '../firebaseConfig';
import { useAuth } from "../context/AuthContext";
import CommentSection from "./CommentSection";


const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(post.likes || 0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Check if the current user already liked the post
    const checkLikeStatus = async () => {
      if (currentUser) {
        const likeDocRef = doc(db, "posts", post.id, "likes", currentUser.uid);
        const likeDoc = await getDoc(likeDocRef);  // Corrected to use getDoc for a single document
        setLikedByUser(likeDoc.exists());
      }
    };
    checkLikeStatus();
  }, [currentUser, post.id]);

  const handleLike = async () => {
    const postRef = doc(db, "posts", post.id);
    const likeRef = doc(db, "posts", post.id, "likes", currentUser.uid);

    try {
      if (likedByUser) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likes: likes - 1 });
        setLikes(likes - 1);
        setLikedByUser(false);
      } else {
        await setDoc(likeRef, { userId: currentUser.uid });
        await updateDoc(postRef, { likes: likes + 1 });
        setLikes(likes + 1);
        setLikedByUser(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar curtida:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, "posts", post.id, "comments");
      const commentsSnapshot = await getDocs(commentsRef);
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());
      setComments(commentsList);
    };
    fetchComments();
  }, [post.id]);

  return (
    <div className="post overflow-hidden max-w-full inline-flex flex-col justify-center">
      <div className="flex items-center p-4">
        <img
          src={post.userProfileImage || '/path/to/placeholder.jpg'}
          alt="user profile"
          className="w-10 h-10 rounded-full mr-4"
        />
        <p className="font-semibold text-lightGray">{post.username}</p>
      </div>
      <img src={post.imageUrl} alt="post" className="max-w-full h-64 object-cover" />
      <div className="p-4">
        <p className="text-lightGray">{post.description}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button onClick={handleLike} className={`text-blue-500 font-semibold ${likedByUser ? 'text-red-500' : ''}`}>
            {likedByUser ? "♥︎" : "♥︎"} {likes}
          </button>
        </div>
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default Post;
