// src/utils/firebaseUtils.js
import { db } from '../firebaseConfig';
import { collection, addDoc, doc } from "firebase/firestore";

export const addMockPost = async () => {
  try {
    // Adiciona a postagem principal
    const postRef = await addDoc(collection(db, "posts"), {
      username: "UsuarioTeste",
      userProfileImage: "https://via.placeholder.com/50",
      imageUrl: "https://via.placeholder.com/400",
      description: "Postagem de teste",
      likes: 0
    });

    console.log("Postagem adicionada com sucesso!");

    // Adiciona um comentário à subcoleção 'comments' dentro da nova postagem
    await addDoc(collection(db, "posts", postRef.id, "comments"), {
      username: "ComentadorTeste",
      text: "Legal!"
    });

    console.log("Comentário adicionado com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar postagem ou comentário: ", e);
  }
};
