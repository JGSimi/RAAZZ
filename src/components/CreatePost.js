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
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
      navigate('/feed');
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Criar Nova Postagem</h2>

      <div className="mb-3">
        <label className="block text-gray-700">Imagem da Postagem</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Postar"}
      </button>
    </form>
  );
};

export default CreatePost;
