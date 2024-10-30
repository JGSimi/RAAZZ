// src/components/Feed.js
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Dados simulados para testar o feed sem backend
    const mockPosts = [
      {
        _id: "1",
        userId: "user1",
        imageUrl: "https://via.placeholder.com/400",
        description: "Primeira postagem de teste",
        likes: 10,
        comments: ["Incrível!", "Amei essa postagem!"],
      },
      {
        _id: "2",
        userId: "user2",
        imageUrl: "https://via.placeholder.com/400",
        description: "Outra postagem interessante",
        likes: 5,
        comments: ["Muito legal!", "Gostei!"],
      },
      {
        _id: "3",
        userId: "user3",
        imageUrl: "https://via.placeholder.com/400",
        description: "Mais um exemplo de postagem",
        likes: 3,
        comments: ["Show!", "Legal demais!"],
      },
    ];

    setPosts(mockPosts); // Carrega os dados mockados
  }, []);

  return (
    <div className="feed space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Feed de Postagens</h2>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">Nenhuma postagem disponível</p>
      )}
    </div>
  );
};

export default Feed;
