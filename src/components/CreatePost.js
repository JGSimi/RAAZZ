// src/components/CreatePost.js
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebaseConfig';

const CreatePost = () => {
  const [username, setUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "posts"), {
        username,
        userProfileImage,
        imageUrl,
        description,
        likes: 0,
      });
      console.log("Postagem criada com sucesso!");

      // Limpa os campos após a submissão
      setUsername("");
      setUserProfileImage("");
      setImageUrl("");
      setDescription("");
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
        <label className="block text-gray-700">Nome de Usuário</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Imagem de Perfil (URL)</label>
        <input
          type="text"
          value={userProfileImage}
          onChange={(e) => setUserProfileImage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Imagem da Postagem (URL)</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
