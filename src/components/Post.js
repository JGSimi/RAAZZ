// src/components/Post.js
import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore"; // Adicionei 'updateDoc' aqui
import { db } from '../firebaseConfig';
import CommentSection from "./CommentSection";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([]);

  const handleLike = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, { likes: likes + 1 });
      setLikes(likes + 1); // Atualiza o estado local
    } catch (error) {
      console.error("Erro ao curtir a postagem:", error);
    }
  };

  // Função para carregar os comentários da subcoleção
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, "posts", post.id, "comments");
        const commentsSnapshot = await getDocs(commentsRef);
        const commentsList = commentsSnapshot.docs.map(doc => doc.data());
        setComments(commentsList);
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      }
    };

    fetchComments();
  }, [post.id]);

  return (
    <div className="post overflow-hidden max-w-full inline-flex flex-col justify-center">
      {/* Perfil do usuário acima da imagem */}
      <div className="flex items-center p-4">
        <img
          src={post.userProfileImage}
          alt="user profile"
          className="w-10 h-10 rounded-full mr-4"
        />
        <p className="font-semibold text-lightGray">{post.username}</p>
      </div>
      <img src={post.imageUrl} alt="post" className="max-w-full h-64 object-cover" />
      <div className="p-4">
        <p className="text-lightGray">{post.description}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button onClick={handleLike} className="text-blue-500 font-semibold">
            Curtir ({likes})
          </button>
        </div>
        {/* Renderizando a seção de comentários com os dados carregados */}
        <CommentSection comments={comments} />
      </div>
    </div>
  );
};

export default Post;
