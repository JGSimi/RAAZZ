import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, setDoc, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Post from './Post';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    location: '',
    interests: [],
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: ''
    }
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const navigate = useNavigate();

  // Buscar dados do perfil e posts do usuário
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setProfileData(prev => ({
            ...prev,
            ...userDoc.data(),
            displayName: currentUser.displayName || userDoc.data().displayName || ''
          }));
        } else {
          // Criar documento do usuário se não existir usando setDoc
          const initialData = {
            displayName: currentUser.displayName || '',
            bio: '',
            location: '',
            interests: [],
            socialLinks: {
              instagram: '',
              facebook: '',
              twitter: ''
            },
            createdAt: new Date(),
            photoURL: currentUser.photoURL || ''
          };
          
          await setDoc(userDocRef, initialData); // Usando setDoc ao invés de updateDoc
          setProfileData(initialData);
        }

        // Buscar posts do usuário - versão simplificada temporária
        const postsQuery = query(
          collection(db, 'posts'),
          where('userId', '==', currentUser.uid),
          orderBy('timestamp', 'desc')
        );
        
        const postsSnapshot = await getDocs(postsQuery);
        const posts = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        
        // Ordenar os posts no cliente
        const sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);
        
        setUserPosts(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  // Manipular upload de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Salvar alterações do perfil
  const handleSave = async () => {
    setSaving(true);
    try {
      let photoURL = currentUser.photoURL;

      if (newProfileImage) {
        const imageRef = ref(storage, `profiles/${currentUser.uid}/${Date.now()}_profile`);
        await uploadBytes(imageRef, newProfileImage);
        photoURL = await getDownloadURL(imageRef);
      }

      // Atualizar perfil no Firebase Auth
      await updateUserProfile({
        displayName: profileData.displayName,
        photoURL: photoURL
      });

      // Atualizar ou criar documento no Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userData = {
        ...profileData,
        photoURL: photoURL,
        updatedAt: new Date()
      };

      await setDoc(userDocRef, userData, { merge: true }); // Usando setDoc com merge: true

      setIsEditing(false);
      setNewProfileImage(null);
      setProfileImagePreview(null);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar alterações. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        {/* Container do Perfil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seção de Informações do Perfil */}
          <div className="lg:col-span-1">
            <div className="bg-black/80 rounded-xl p-4 md:p-6 sticky top-24 backdrop-blur-sm
              border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                {/* Foto do Perfil com Efeitos */}
                <div className="relative group mb-6">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-700 
                    rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <img
                    src={profileImagePreview || currentUser.photoURL || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover
                      transition-transform duration-300 group-hover:scale-105"
                  />
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full 
                      cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex flex-col items-center">
                        <FaCamera className="text-white text-2xl mb-1" />
                        <span className="text-white text-xs">Alterar foto</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Nome e Bio com Melhor Espaçamento */}
                <div className="w-full space-y-5">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        displayName: e.target.value
                      }))}
                      className="w-full bg-gray-900/50 text-white text-xl font-bold px-4 py-2 rounded-lg
                        border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500
                        transition-all duration-300 text-center"
                      placeholder="Seu nome"
                    />
                  ) : (
                    <h1 className="text-xl md:text-2xl font-bold text-white">
                      {profileData.displayName || 'Usuário'}
                    </h1>
                  )}

                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        bio: e.target.value
                      }))}
                      className="w-full bg-gray-900/50 text-white p-4 rounded-lg resize-none
                        border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500
                        transition-all duration-300"
                      placeholder="Conte um pouco sobre você..."
                      rows="4"
                    />
                  ) : (
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {profileData.bio || 'Nenhuma biografia adicionada'}
                    </p>
                  )}

                  {/* Localização com Ícone */}
                  <div className="flex justify-center pt-2">
                    {isEditing ? (
                      <div className="relative w-full">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            location: e.target.value
                          }))}
                          className="w-full bg-gray-900/50 text-white pl-12 pr-4 py-2 rounded-lg
                            border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500
                            transition-all duration-300"
                          placeholder="Sua localização"
                        />
                      </div>
                    ) : profileData.location && (
                      <span className="text-gray-400 flex items-center justify-center space-x-2
                        bg-gray-900/30 px-4 py-2 rounded-full">
                        <span>📍</span>
                        <span>{profileData.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Botões de Ação com Melhor Visual */}
                <div className="mt-8 w-full">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 
                        bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 
                        transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <FaEdit className="text-green-500 group-hover:scale-110 transition-transform duration-300" />
                      <span>Editar Perfil</span>
                    </button>
                  ) : (
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNewProfileImage(null);
                          setProfileImagePreview(null);
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 
                          bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 
                          transition-all duration-300 hover:scale-[1.02]"
                      >
                        <FaTimes />
                        <span>Cancelar</span>
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 
                          bg-green-500 text-white rounded-lg hover:bg-green-400 
                          transition-all duration-300 hover:scale-[1.02] disabled:bg-gray-600
                          disabled:hover:scale-100 disabled:cursor-not-allowed
                          shadow-lg shadow-green-500/20"
                      >
                        <FaSave className={saving ? 'animate-spin' : ''} />
                        <span>{saving ? 'Salvando...' : 'Salvar'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Posts com Melhor Visual */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-white">Posts</h2>
                <span className="text-gray-400 text-sm">
                  {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
              <div className="space-y-6">
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <Post key={post.id} post={post} />
                  ))
                ) : (
                  <div className="bg-black/50 rounded-xl p-8 text-center border border-gray-800/50">
                    <p className="text-gray-400 mb-4">Nenhum post ainda</p>
                    <button
                      onClick={() => navigate('/post')}
                      className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 
                        transition-all duration-300 hover:scale-105"
                    >
                      Criar Primeiro Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 