import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Heart, Eye, Bookmark, Share2, Search } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider,   signInWithEmailAndPassword, createUserWithEmailAndPassword,  signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB24X1C8LNgruXSjaBrupDnIhfqQnsRlAE",
  authDomain: "dribbble-clone-61974.firebaseapp.com",
  projectId: "dribbble-clone-61974",
  storageBucket: "dribbble-clone-61974.firebasestorage.app",
  messagingSenderId: "553166439143",
  appId: "1:553166439143:web:4e48f7ffe5ad9f6d5a5842",
  measurementId: "G-KM64QJTRQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const LoginModal = ({ isOpen, onClose, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Create new user
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error) {
      setError(error.message);
      console.error("Authentication error:", error);
    }
  }
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      setError(error.message);
      console.error("Authentication error:", error);
    }
  };
  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="bg-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Registrarse en Dribbble' : 'Iniciar sesión en Dribbble'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}

          <button 
            onClick={handleGoogleSignIn}
            className="w-full mb-4 p-3 border rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50"
          >
            <img src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png" alt="Google" className="w-5 h-5" />
            <span>Continuar con Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">
                o {isSignUp ? 'registrarse' : 'iniciar sesión'} con correo electrónico
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleEmailSignIn}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {isSignUp ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isSignUp 
              ? '¿Ya tienes una cuenta? ' 
              : '¿No tienes una cuenta? '}
            <button 
              onClick={toggleSignUpMode}
              className="text-gray-900 hover:underline"
            >
              {isSignUp ? 'Iniciar sesión' : 'Regístrate'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};


// Modificar aquí: Información de usuarios
const usuarios = [ 
  { id: 1, nombre: "brahyan", imagen_de_perfil: "https://previews.123rf.com/images/martialred/martialred1608/martialred160800020/61263273-cuenta-de-usuario-masculino-perfil-del-icono-del-c%C3%ADrculo-plana-para-aplicaciones-y-sitios-web.jpg" }, 
  { id: 2, nombre: "Jorge", imagen_de_perfil: "https://img.freepik.com/vector-premium/retrato-hombre-marco-redondo-avatar-personaje-masculino-aislado-fondo-blanco-perfil-usuario_559729-530.jpg" }, 
  { id: 3, nombre: "Sebastian", imagen_de_perfil: "https://img.freepik.com/vector-premium/hombre-camiseta-azul-circulo-amarillo-cabello-ondulado-avatar-nino-circulo_630301-58.jpg" },

  { id: 4, nombre: "Andres", imagen_de_perfil: "https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14046.jpg" },
  { id: 5, nombre: "Jose", imagen_de_perfil: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRufUmsuG6UDUWQuxL0OO3z6C_kl20uOOKHA&s" },
  { id: 6, nombre: "Juan", imagen_de_perfil: "https://img.freepik.com/vector-premium/retrato-hombre-marco-redondo-avatar-personaje-masculino-aislado-fondo-blanco-perfil-usuario_559729-534.jpg" },
  { id: 7, nombre: "Martin", imagen_de_perfil: "https://img.freepik.com/vector-premium/hombre-sudadera-capucha-azul-circulo-azul-cabello-castano_630301-46.jpg" },
  { id: 8, nombre: "Antonio", imagen_de_perfil: "https://st4.depositphotos.com/11953928/25416/v/950/depositphotos_254168020-stock-illustration-man-avatar-profile.jpg" },

];

const ShotCard = ({ shot = {}, onOpenModal }) => {
  // Modificar aquí: Estructura de cada publicación (shot)
  const { 
      likes = 0, 
      views = 0, 
      image = '/api/placeholder/400/300', 
      alt_description = 'Diseño de la foto', 
      userId 
  } = shot;

  const { nombre, imagen_de_perfil } = usuarios.find((u) => u.id === userId);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [viewCount, setViewCount] = useState(views);

  const handleLike = (e) => {
      e.stopPropagation();
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleOpenModal = () => {
      setViewCount(viewCount + 1);
      onOpenModal(shot);
  };

  return (
    <div onClick={handleOpenModal} className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
                <img src={image} alt={alt_description} className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100" 
                        onClick={handleLike}
                    >
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            className={`fill-current ${liked ? 'text-pink-500' : 'text-gray-600'}`}
                        >
                            <path d="M10.7 4.3L8 7L5.3 4.3C4.9 3.9 4.3 3.7 3.7 3.7C3.1 3.7 2.5 3.9 2.1 4.3C1.3 5.1 1.3 6.3 2.1 7.1L8 13L13.9 7.1C14.7 6.3 14.7 5.1 13.9 4.3C13.1 3.5 11.9 3.5 11.1 4.3L10.7 4.3Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src={imagen_de_perfil} alt={nombre} className="w-8 h-8 rounded-full" />
                        <div>
                            <h3 className="font-medium text-sm">{nombre}</h3>
                            <span className="text-xs text-gray-500">PRO</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                        <button 
                            onClick={handleLike} 
                            className="flex items-center space-x-1 hover:text-pink-500"
                        >
                           <svg width="16" height="16" viewBox="0 0 16 16" className={`fill-current ${liked ? 'text-pink-500' : ''}`}>
                                <path d="M10.7 4.3L8 7L5.3 4.3C4.9 3.9 4.3 3.7 3.7 3.7C3.1 3.7 2.5 3.9 2.1 4.3C1.3 5.1 1.3 6.3 2.1 7.1L8 13L13.9 7.1C14.7 6.3 14.7 5.1 13.9 4.3C13.1 3.5 11.9 3.5 11.1 4.3L10.7 4.3Z"/>
                            </svg>
                            <span className={`text-sm ${liked ? 'text-pink-500' : ''}`}>
                                {likeCount}
                            </span>
                        </button>
                        <div className="flex items-center space-x-1">
                        <Eye width="16" height="16" className="fill-current text-gray-600" />
                            <span className="text-sm">{viewCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  const { userId } = project;
  const { nombre, imagen_de_perfil } = usuarios.find((u) => u.id === userId);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes);

  const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl" aria-describedby="project-description">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                        <img 
                            src={imagen_de_perfil} 
                            alt={nombre} 
                            className="w-12 h-12 rounded-full" 
                        />
                        <div>
                            <h3 className="font-medium">{project.title}</h3>
                            <p className="text-gray-600">{nombre}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full rounded-lg mb-4" 
                />
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button 
                            className="flex items-center space-x-1 text-gray-600" 
                            onClick={handleLike}
                        >
                            <Heart 
                                className={`w-5 h-5 ${liked ? 'text-pink-500' : ''}`} 
                            />
                            <span>{likeCount}</span>
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
  );
};

const DribbbleClone = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
      // Modificar aquí: Detalles de las publicaciones
      { 
          id: 1, 
          title: "Brahyan Cervantes", 
          image: "https://edu21.cl/wp-content/uploads/Importancia-de-la-Tecnologia-en-la-educacion-Ventajas-y-Principales-Usos.jpg", 
          userId: 1, 
          likes: 5, 
          views: 91 
      },
      { 
          id: 2, 
          title: "Jorge Ruiz", 
          image: "https://img.freepik.com/vector-gratis/fondo-degradado-ui-ux_23-2149024129.jpg", 
          userId: 2, 
          likes: 5, 
          views: 104 
      },
      { 
          id: 3, 
          title: "Sebastian Ramirez", 
          image: "https://img.freepik.com/vector-premium/hombre-camiseta-azul-circulo-amarillo-cabello-ondulado-avatar-nino-circulo_630301-58.jpg", 
          userId: 3, 
          likes: 29, 
          views: 740 
      },
      { 
          id: 4, 
          title: "Andres Perez", 
          image: "https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14046.jpg", 
          userId: 4, 
          likes: 10, 
          views: 1023 
      },
      { 
          id: 5, 
          title: "Jose", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRufUmsuG6UDUWQuxL0OO3z6C_kl20uOOKHA&s", 
          userId: 5, 
          likes: 37, 
          views: 456
      },
      { 
          id: 6, 
          title: "Juan Sanchez", 
          image: "https://img.freepik.com/vector-premium/retrato-hombre-marco-redondo-avatar-personaje-masculino-aislado-fondo-blanco-perfil-usuario_559729-534.jpg", 
          userId: 6, 
          likes: 67, 
          views: 754
      },
      { 
          id: 7, 
          title: "Martin Zapatas", 
          image: "https://img.freepik.com/vector-premium/hombre-sudadera-capucha-azul-circulo-azul-cabello-castano_630301-46.jpg", 
          userId: 7, 
          likes: 95, 
          views: 954
      },
      { 
          id: 8, 
          title: "Antonio Cervantes", 
          image: "https://st4.depositphotos.com/11953928/25416/v/950/depositphotos_254168020-stock-illustration-man-avatar-profile.jpg", 
          userId: 8, 
          likes: 22, 
          views: 845
      }
  ])
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const trendingSearches = [
    'página de destino',
    'comercio electrónico',
    'aplicación móvil',
    'diseño de logotipo',
    'panel',
    'iconos'
  ];

  useEffect(() => {
    // Monitor auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Load mock projects
    setLoading(true);
    const mockProjects = [
      { 
        id: 1, 
        title: "Brahyan Cervantes", 
        image: "https://edu21.cl/wp-content/uploads/Importancia-de-la-Tecnologia-en-la-educacion-Ventajas-y-Principales-Usos.jpg", 
        userId: 1, 
        likes: 5, 
        views: 91 
    },
    { 
        id: 2, 
        title: "Jorge Ruiz", 
        image: "https://img.freepik.com/vector-gratis/fondo-degradado-ui-ux_23-2149024129.jpg", 
        userId: 2, 
        likes: 5, 
        views: 104 
    },
    { 
        id: 3, 
        title: "Sebastian Ramirez", 
        image: "https://cdn.dribbble.com/userupload/18911406/file/original-82dc45b7afde54951423a9ad7f79c18a.png?resize=1024x768&vertical=center", 
        userId: 3, 
        likes: 29, 
        views: 740 
    },
    { 
        id: 4, 
        title: "Andres Perez", 
        image: "https://cdn.dribbble.com/userupload/18907025/file/original-d0fbbdf0f1525e996da211e16c888b02.jpg?resize=1024x768&vertical=center", 
        userId: 4, 
        likes: 10, 
        views: 1023 
    },
    { 
        id: 5, 
        title: "Jose", 
        image: "https://cdn.dribbble.com/userupload/18901623/file/original-210a7d935d18d0e855078ea64bc541fa.jpg?resize=1024x768&vertical=center", 
        userId: 5, 
        likes: 37, 
        views: 456
    },
    { 
        id: 6, 
        title: "Juan Sanchez", 
        image: "https://cdn.dribbble.com/userupload/18860879/file/original-3b2d6f74930864997221c53bdd6ccdb2.png?resize=1024x768&vertical=center", 
        userId: 6, 
        likes: 67, 
        views: 754
    },
    { 
        id: 7, 
        title: "Martin Zapatas", 
        image: "https://cdn.dribbble.com/userupload/18688502/file/original-536346022b53ddef67d61689c7ddc893.jpg?resize=1024x768&vertical=center", 
        userId: 7, 
        likes: 95, 
        views: 954
    },
    { 
        id: 8, 
        title: "Antonio Cervantes", 
        image: "https://cdn.dribbble.com/userupload/18926537/file/original-79e86998a4afc3c867a602f6784c6b3f.jpg?resize=1024x768&vertical=center", 
        userId: 8, 
        likes: 22, 
        views: 845
    }
    ];
    
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-serif">Dribbble</span>
            <div className="hidden sm:flex sm:space-x-8 ml-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">Explorar</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Contratar un diseñador</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Encontrar trabajo</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Blog</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.email}</span>
                <button 
                  onClick={handleSignOut}
                  className="bg-gray-900 text-white rounded-full px-4 py-2 hover:bg-gray-800"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-gray-900 text-white rounded-full px-4 py-2 hover:bg-gray-800"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>

    <div className="pt-16 pb-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-6xl font-serif mb-6">
          Descubra los mejores diseñadores del mundo
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Explora el trabajo de los diseñadores más talentosos y experimentados listos para asumir tu próximo proyecto
        </p>
        
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="w-full px-6 py-4 bg-gray-100 rounded-full pr-32"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
              <button className="px-4 py-2 text-gray-600">
                Disparos <span className="ml-1">▼</span>
              </button>
              <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="text-gray-500">Búsquedas de tendencia:</span>
          {trendingSearches.map((term, index) => (
            <button key={index} className="text-gray-700 hover:text-gray-900">
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>

    {loading ? (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    ) : (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ShotCard
              key={project.id}
              shot={project}
              onOpenModal={(shot) => setSelectedProject(shot)}
            />
          ))}
        </div>
      </div>
    )}

    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
      onError={(error) => setError(error)}
    />

    <ProjectModal
      isOpen={!!selectedProject}
      onClose={() => setSelectedProject(null)}
      project={selectedProject}
    />
  </div>
  );
};

export default DribbbleClone;