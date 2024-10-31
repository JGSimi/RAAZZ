// src/components/Feed.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import Post from "./Post";

const Feed = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const observer = useRef();
  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  const fetchPosts = async (filterType = filter, isInitial = true) => {
    if (isInitial) setIsLoading(true);
    setError(null);

    try {
      let postsQuery;
      const postsRef = collection(db, "posts");

      const baseQuery = isInitial
        ? query(
          postsRef,
          filterType === 'trending'
            ? orderBy('timestamp', 'desc')
            : orderBy('timestamp', 'desc'),
          limit(POSTS_PER_PAGE)
        )
        : query(
          postsRef,
          filterType === 'trending'
            ? orderBy('timestamp', 'desc')
            : orderBy('timestamp', 'desc'),
          startAfter(lastDoc),
          limit(POSTS_PER_PAGE)
        );

      const snapshot = await getDocs(baseQuery);

      if (snapshot.empty) {
        setHasMore(false);
        if (isInitial) setPosts([]);
        return;
      }

      const postsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      if (isInitial) {
        setPosts(postsList);
      } else {
        setPosts(prev => [...prev, ...postsList]);
      }

      setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
      setError("Não foi possível carregar as postagens. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  // Configuração do Intersection Observer para rolagem infinita
  const lastPostRef = useCallback(node => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPosts(filter, false);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, filter]);

  useEffect(() => {
    setPosts([]);
    setLastDoc(null);
    setHasMore(true);
    fetchPosts(filter);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleNewPost = () => {
    navigate('/post');
  };

  const filterOptions = [
    { value: 'all', label: 'Recentes' },
    { value: 'trending', label: 'Populares' }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900">
      <div className="feed flex flex-col items-center w-full p-4 min-h-screen">


        {/* Filtros */}
        <div className="w-full max-w-2xl mb-6 bg-black/40 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex justify-center gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${filter === option.value
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="w-full max-w-2xl space-y-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              ref={index === posts.length - 1 ? lastPostRef : null}
            >
              <Post post={post} onPostUpdate={() => fetchPosts(filter)} />
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-center p-4">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center h-64 bg-red-500/10 rounded-xl">
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => fetchPosts(filter)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {!isLoading && !error && posts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 bg-black/50 rounded-xl">
              <p className="text-gray-400 text-lg mb-4">
                Nenhuma postagem disponível
              </p>
              <button
                onClick={handleNewPost}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 transition-colors"
              >
                Criar Nova Postagem
              </button>
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-4 text-gray-400">
              Você chegou ao final 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
