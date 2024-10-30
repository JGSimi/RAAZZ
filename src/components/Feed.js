// src/components/Feed.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Feed = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Redireciona para o login se não houver usuário autenticado
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Erro ao carregar postagens:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = () => {
    navigate('/post');
  };

  return (
    <div className="feed flex flex-col w-full max-w-2xl bg-black">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">Nenhuma postagem disponível</p>
      )}

      <button
        onClick={handleNewPost}
        className="w-fit fixed right-5 bottom-5 rounded-full py-3 px-5 bg-black text-white border-white border-4 font-semibold hover:bg-green-400 hover:scale-105 active:scale-95 transition-all duration-300"

      >
       +
      </button>
    </div>
  );
};

export default Feed;
