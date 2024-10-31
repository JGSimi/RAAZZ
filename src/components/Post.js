// src/components/Post.js
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useAuth } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import ImageViewer from './ImageViewer';

const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(post.likes || 0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (currentUser) {
        const likeDocRef = doc(db, "posts", post.id, "likes", currentUser.uid);
        const likeDoc = await getDoc(likeDocRef);
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

  // Formatação da data
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Data indisponível';
    
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data indisponível';
    }
  };

  return (
    <>
      <div className={`post bg-black/80 rounded-xl shadow-lg shadow-black/30 overflow-hidden 
        border border-gray-800 hover:border-gray-700 transition-all duration-300
        ${!post.imageUrl ? 'max-w-2xl mx-auto' : ''}`}
      >
        {/* Cabeçalho do Post */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <img
              src={post.userProfileImage || '/path/to/placeholder.jpg'}
              alt="user profile"
              className="w-12 h-12 rounded-full mr-4 border-2 border-green-500 object-cover"
            />
            <div>
              <p className="font-semibold text-white">{post.username}</p>
              <p className="text-xs text-gray-400">{formatDate(post.timestamp)}</p>
            </div>
          </div>
        </div>
        
        {/* Conteúdo do Post */}
        <div className={`${!post.imageUrl ? 'p-6' : ''}`}>
          {post.imageUrl && (
            <div className="relative">
              <img 
                src={post.imageUrl} 
                alt="post" 
                className="w-full h-[fit] max-h-[600px] object-cover cursor-zoom-in
                  hover:opacity-95 transition-opacity duration-300"
                onClick={() => setIsImageViewerOpen(true)}
              />
            </div>
          )}

          {/* Descrição do Post */}
          <div className={`${post.imageUrl ? 'p-4' : ''} space-y-4`}>
            {post.description && (
              <p className={`text-gray-300 ${!post.imageUrl ? 'text-lg leading-relaxed' : 'text-sm'}`}>
                {post.description}
              </p>
            )}

            {/* Área de Interação */}
            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={handleLike} 
                className={`flex items-center space-x-2 text-lg transition-all duration-300 
                ${likedByUser ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'}`}
              >
                <span className="text-2xl">{likedByUser ? "♥" : "♡"}</span>
                <span>{likes}</span>
              </button>
            </div>

            {/* Seção de Comentários */}
            <CommentSection postId={post.id} />
          </div>
        </div>
      </div>

      {/* Image Viewer */}
      {isImageViewerOpen && (
        <ImageViewer
          imageUrl={post.imageUrl}
          onClose={() => setIsImageViewerOpen(false)}
        />
      )}
    </>
  );
};

export default Post;
