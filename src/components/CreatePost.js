// src/components/CreatePost.js
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebaseConfig';
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTimes } from 'react-icons/fa';

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() && !imageFile) {
      alert("Adicione uma descrição ou uma imagem para criar o post.");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const imageRef = ref(storage, `posts/${currentUser.uid}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        username: currentUser.displayName || "User",
        userProfileImage: currentUser.photoURL || '/path/to/placeholder.jpg',
        imageUrl,
        description: description.trim(),
        likes: 0,
        userId: currentUser.uid,
        timestamp: serverTimestamp()
      });

      navigate('/feed');
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
      alert("Erro ao criar postagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 p-4">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-black/80 rounded-xl shadow-lg p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={currentUser?.photoURL || 'https://via.placeholder.com/40'}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <span className="text-white font-medium">
              {currentUser?.displayName || currentUser?.email}
            </span>
          </div>

          {/* Text Input */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="O que você está pensando?"
            className="w-full p-4 bg-transparent text-white placeholder-gray-400 text-lg resize-none border-none focus:ring-0"
            rows="3"
            autoFocus
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <label className="flex items-center space-x-2 cursor-pointer text-gray-400 hover:text-green-500 transition-colors">
              <FaImage className="text-xl" />
              <span>Adicionar foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate('/feed')}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (!description.trim() && !imageFile)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                  ${isSubmitting || (!description.trim() && !imageFile)
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-400 hover:scale-105 active:scale-95'
                  }`}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
