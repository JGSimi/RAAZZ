// src/components/CreatePost.js
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from '../firebaseConfig';
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const imageRef = ref(storage, `posts/${currentUser.uid}/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        username: currentUser.displayName || "User",
        userProfileImage: currentUser.photoURL || '/path/to/placeholder.jpg',
        imageUrl,
        description,
        likes: 0,
        userId: currentUser.uid
      });

      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      navigate('/feed');
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form p-5 bg-black rounded-lg shadow-md border-white border-4 space-y-4">
      <h2 className="text-xl text-white text-center font-bold mb-4">Criar Nova Postagem</h2>

      <div className="mb-3">
        <label className="block mb-1 text-gray-200 font-semibold">Imagem da Postagem</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border-2 rounded text-white focus:outline-none focus:border-green-400"
        />
        {imagePreview && (
          <div className="mt-3">
            <img src={imagePreview} alt="Preview da Imagem" className="w-full h-40 object-cover rounded-md border-2 border-white" />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-gray-200 font-semibold">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border-2 rounded bg-transparent text-white focus:outline-none focus:border-green-400"
          rows="4"
          placeholder="Escreva uma descrição para sua postagem..."
        ></textarea>
      </div>

      <button
        type="submit"
        className={`w-full bg-transparent border-4 text-white font-semibold py-2 px-4 rounded transition-colors hover:bg-green-400 hover:text-black ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Postar"}
      </button>
    </form>
  );
};

export default CreatePost;
