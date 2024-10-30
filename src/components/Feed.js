// src/components/Feed.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Post from "./Post";

const Feed = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Verifica se o carregamento terminou antes de tentar redirecionar
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  useEffect(() => {
    // Dados simulados para testar o feed sem backend
    const mockPosts = [
      {
        _id: "1",
        userId: "user1",
        username: "Usuario1",
        userProfileImage: "https://via.placeholder.com/50",
        imageUrl: "https://via.placeholder.com/400",
        description: "Primeira postagem de teste",
        likes: 10,
        comments: ["Incrível!", "Amei essa postagem!"],
      },
      {
        _id: "2",
        userId: "user2",
        username: "Usuario2",
        userProfileImage: "https://via.placeholder.com/50",
        imageUrl: "https://via.placeholder.com/400",
        description: "Outra postagem interessante",
        likes: 5,
        comments: ["Muito legal!", "Gostei!"],
      },
      {
        _id: "3",
        userId: "user3",
        username: "Usuario3",
        userProfileImage: "https://via.placeholder.com/50",
        imageUrl: "https://via.placeholder.com/400",
        description: "Mais um exemplo de postagem",
        likes: 3,
        comments: ["Show!", "Legal demais!"],
      },
    ];

    setPosts(mockPosts); // Carrega os dados mockados
  }, []);

  return (
    <div className="feed flex flex-col w-full bg-black">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">Nenhuma postagem disponível</p>
      )}
    </div>
  );
};

export default Feed;