import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // Navbar
      "nav.home": "Inicio",
      "nav.messages": "📬 Mensajes",
      "nav.profile": "Perfil",
      "nav.gallery": "Galería",
      "nav.users": "Usuarios",
      "nav.help": "❓ Ayuda",
      "nav.login": "Iniciar Sesión",
      "nav.logout": "Cerrar Sesión",
      
      // Home
      
      // Español
      "home.adminPanel": "Panel de Administrador",
      "home.title": "Nuestros Usuarios y Ofertas",
      "home.search": "Buscar por nombre, usuario, biografía u oferta...",
      "home.searching": "Buscando...",
      "home.searchingUsers": "Buscando usuarios...",
      "home.result": "resultado",
      "home.found": "encontrado",
      "home.noResults": "No se encontraron usuarios con",
      "home.noName": "Sin nombre",
      "home.city": "Ciudad",
      "home.offerAndSpecialties": "Oferta y especialidades",
      "home.loadMore": "Ver más usuarios",
      "home.showingAll": "Mostrando todos los usuarios",
      
      // Profile
      // En español
      "profile.noPhoto": "Sin foto",
      "profile.imageHint": "JPG, PNG o GIF (se comprimirá a 500KB max)",
      "profile.imageUploaded": "Imagen subida correctamente",
      "profile.imageError": "Error al subir la imagen",
      "profile.usernameMinLength": "El nombre de usuario debe tener al menos 3 caracteres",
      "profile.usernameTaken": "Ese nombre de usuario ya está en uso",
      "profile.updated": "Perfil actualizado correctamente",
      "profile.created": "Perfil creado correctamente",
      "profile.saveError": "Error al guardar el perfil",
      "profile.accountDeleted": "Cuenta eliminada exitosamente",
      "profile.deleteError": "Error al eliminar la cuenta. Intenta de nuevo.",
      "profile.country": "País",
      "profile.countryPlaceholder": "tu país...",
      "profile.city": "Ciudad",
      "profile.cityPlaceholder": "tu ciudad...",
      "profile.slogan": "Frase de propaganda",
      "profile.sloganPlaceholder": "Eslogan o lema...",
      "profile.backHome": "Volver al inicio",
      "profile.deleteItem1": "Tu cuenta de acceso",
      "profile.deleteItem2": "Tu perfil y datos",
      "profile.deleteItem3": "Todas tus imágenes",
      "profile.deleteItem4": "Todos tus mensajes",
      "profile.deleting": "Eliminando...",
      "profile.confirmDelete": "Sí, eliminar mi cuenta",

      // Gallery
      "gallery.title": "Mi Galería",
      "gallery.subtitle": "Comparte imágenes de tus trabajos o servicios",
      "gallery.select": "Seleccionar Imagen",
      "gallery.uploading": "Subiendo...",
      "gallery.description": "Descripción",
      "gallery.descPlaceholder": "Describe esta imagen...",
      "gallery.limitReached": "Has alcanzado el límite de 6 imágenes",
      "gallery.noImages": "Aún no has subido imágenes",
      "gallery.uploadFirst": "Sube tu primera imagen para mostrar tu trabajo",
      
      // Messages
      "messages.title": "Mensajes",
      "messages.noConversations": "No tienes conversaciones",
      "messages.startConversation": "Explora usuarios y envía tu primer mensaje",
      "messages.loading": "Cargando mensajes...",
      "messages.you": "Tú",
      "messages.unread": "nuevo",
      "messages.newMessages": "nuevos",
      
      // Public Profile
      "public.notFound": "Usuario no encontrado",
      "public.notFoundDesc": "El perfil que buscas no existe o el nombre de usuario es incorrecto.",
      "public.backHome": "Volver al Inicio",
      "public.offer": "💼 Oferta / Servicio / Especialidades",
      "public.messages": "💬 Mensajes",
      "public.loginRequired": "Debes iniciar sesión para enviar mensajes",
      "public.loginButton": "Iniciar Sesión",
      "public.conversation": "Conversación",
      "public.loadingMessages": "Cargando mensajes...",
      "public.messagePlaceholder": "Escribe un mensaje a",
      "public.send": "📤 Enviar Mensaje",
      "public.sending": "Enviando...",
      "public.gallery": "📸 Galería",
      "public.images": "imágenes",
      "public.image": "imagen",
      "public.noGallery": "Este usuario aún no ha subido imágenes a su galería",
      
      // Users
      "users.title": "Usuarios",
      "users.all": "Todos los Usuarios",
      
      // Login
      "login.welcome": "Bienvenido",
      "login.subtitle": "Inicia sesión o crea tu cuenta",
      "login.or": "O continúa con",
      "login.google": "Continuar con Google",
      "login.redirecting": "Redirigiendo al dashboard...",
      
      // Help
      "help.title": "❓ Ayuda - Cómo usar Ofertio",
      "help.subtitle": "Guía completa para aprovechar al máximo la plataforma",
      "help.backHome": "← Volver al Inicio",
      "help.startNow": "Comenzar Ahora →",
      
      // Common
      "common.loading": "Cargando...",
      "common.error": "Error",
      "common.success": "Éxito",
      "common.cancel": "Cancelar",
      "common.confirm": "Confirmar",
      "common.delete": "Eliminar",
      "common.edit": "Editar",
      "common.save": "Guardar"
    }
  },
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.messages": "📬 Messages",
      "nav.profile": "Profile",
      "nav.gallery": "Gallery",
      "nav.users": "Users",
      "nav.help": "❓ Help",
      "nav.login": "Login",
      "nav.logout": "Logout",
      
      // Home
      // Inglés
      "home.adminPanel": "Admin Panel",
      "home.title": "Our Users and Offers",
      "home.search": "Search by name, username, bio or offer...",
      "home.searching": "Searching...",
      "home.searchingUsers": "Searching users...",
      "home.result": "result",
      "home.found": "found",
      "home.noResults": "No users found with",
      "home.noName": "No name",
      "home.city": "City",
      "home.offerAndSpecialties": "Offer and specialties",
      "home.loadMore": "Load more users",
      "home.showingAll": "Showing all users",
      
      // Profile
      // En inglés
      "profile.noPhoto": "No photo",
      "profile.imageHint": "JPG, PNG or GIF (will be compressed to 500KB max)",
      "profile.imageUploaded": "Image uploaded successfully",
      "profile.imageError": "Error uploading image",
      "profile.usernameMinLength": "Username must be at least 3 characters",
      "profile.usernameTaken": "That username is already taken",
      "profile.updated": "Profile updated successfully",
      "profile.created": "Profile created successfully",
      "profile.saveError": "Error saving profile",
      "profile.accountDeleted": "Account deleted successfully",
      "profile.deleteError": "Error deleting account. Please try again.",
      "profile.country": "Country",
      "profile.countryPlaceholder": "your country...",
      "profile.city": "City",
      "profile.cityPlaceholder": "your city...",
      "profile.slogan": "Tagline",
      "profile.sloganPlaceholder": "Slogan or motto...",
      "profile.backHome": "Back to home",
      "profile.deleteItem1": "Your access account",
      "profile.deleteItem2": "Your profile and data",
      "profile.deleteItem3": "All your images",
      "profile.deleteItem4": "All your messages",
      "profile.deleting": "Deleting...",
      "profile.confirmDelete": "Yes, delete my account",
      // Gallery
      "gallery.title": "My Gallery",
      "gallery.subtitle": "Share images of your work or services",
      "gallery.select": "Select Image",
      "gallery.uploading": "Uploading...",
      "gallery.description": "Description",
      "gallery.descPlaceholder": "Describe this image...",
      "gallery.limitReached": "You've reached the limit of 6 images",
      "gallery.noImages": "You haven't uploaded images yet",
      "gallery.uploadFirst": "Upload your first image to showcase your work",
      
      // Messages
      "messages.title": "Messages",
      "messages.noConversations": "You have no conversations",
      "messages.startConversation": "Explore users and send your first message",
      "messages.loading": "Loading messages...",
      "messages.you": "You",
      "messages.unread": "new",
      "messages.newMessages": "new",
      
      // Public Profile
      "public.notFound": "User not found",
      "public.notFoundDesc": "The profile you're looking for doesn't exist or the username is incorrect.",
      "public.backHome": "Back to Home",
      "public.offer": "💼 Offer / Service / Specialties",
      "public.messages": "💬 Messages",
      "public.loginRequired": "You must log in to send messages",
      "public.loginButton": "Login",
      "public.conversation": "Conversation",
      "public.loadingMessages": "Loading messages...",
      "public.messagePlaceholder": "Write a message to",
      "public.send": "📤 Send Message",
      "public.sending": "Sending...",
      "public.gallery": "📸 Gallery",
      "public.images": "images",
      "public.image": "image",
      "public.noGallery": "This user hasn't uploaded images to their gallery yet",
      
      // Users
      "users.title": "Users",
      "users.all": "All Users",
      
      // Login
      "login.welcome": "Welcome",
      "login.subtitle": "Log in or create your account",
      "login.or": "Or continue with",
      "login.google": "Continue with Google",
      "login.redirecting": "Redirecting to dashboard...",
      
      // Help
      "help.title": "❓ Help - How to use Ofertio",
      "help.subtitle": "Complete guide to make the most of the platform",
      "help.backHome": "← Back to Home",
      "help.startNow": "Start Now →",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success",
      "common.cancel": "Cancel",
      "common.confirm": "Confirm",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.save": "Save"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false // React ya escapa por defecto
    }
  });

export default i18n;