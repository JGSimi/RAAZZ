// src/components/CommentSection.js
import React, { useState, useEffect } from "react";
import { db } from '../firebaseConfig';
import { addDoc, collection, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, "posts", postId, "comments");
        const q = query(commentsRef, orderBy("timestamp", "desc"));
        const commentsSnapshot = await getDocs(q);
        const commentsList = commentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        }));
        setComments(commentsList);
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const commentsRef = collection(db, "posts", postId, "comments");
      const newCommentData = {
        username: currentUser.displayName || "Usuário",
        userProfileImage: currentUser.photoURL,
        userId: currentUser.uid,
        text: newComment.trim(),
        timestamp: serverTimestamp()
      };

      const docRef = await addDoc(commentsRef, newCommentData);
      
      // Atualiza a UI imediatamente
      setComments(prevComments => [{
        id: docRef.id,
        ...newCommentData,
        timestamp: new Date()
      }, ...prevComments]);
      
      setNewComment("");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes/60)}h`;
    return `${Math.floor(diffInMinutes/1440)}d`;
  };

  return (
    <div className="mt-2">
      <div 
        className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer hover:text-gray-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium">
          {comments.length} comentário{comments.length !== 1 ? 's' : ''}
        </span>
        <span className="text-xs">{isExpanded ? '▼' : '▶'}</span>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-4">
          {/* Form para novo comentário */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <img
              src={currentUser?.photoURL || '/path/to/default-avatar.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 text-sm text-white
                placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Adicione um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${!newComment.trim() || isSubmitting
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-400 active:scale-95'
                }`}
              >
                {isSubmitting ? '...' : 'Enviar'}
              </button>
            </div>
          </form>

          {/* Lista de comentários */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2 group">
                <img
                  src={comment.userProfileImage || '/path/to/default-avatar.png'}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">
                      {comment.username}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
