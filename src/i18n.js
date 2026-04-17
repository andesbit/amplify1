import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // ==================== NAVBAR ====================
      nav: {
        home: "Inicio",
        messages: "📬 Mensajes",
        profile: "Perfil",
        gallery: "Galería",
        users: "Usuarios",
        help: "❓ Ayuda",
        login: "Iniciar Sesión",
        logout: "Cerrar Sesión",
      },

            // ==================== HOME ====================
      home: {
        adminPanel: "Panel de Administrador",
        title: "Nuestros Usuarios y Ofertas",
        search: "Buscar por nombre, usuario, biografía u oferta...",
        searching: "Buscando...",
        searchingUsers: "Buscando usuarios...",
        result: "resultado",
        found: "encontrado",
        noResults: "No se encontraron usuarios con",
        noUsers: "No hay usuarios registrados todavía",
        noName: "Sin nombre",
        city: "Ciudad",
        offerAndSpecialties: "Oferta y especialidades",
        loadMore: "Ver más usuarios",
        showingAll: "Mostrando todos los usuarios",
        loading: "Cargando usuarios..."
      },
      // ==================== PROFILE ====================
      profile: {
        title: "Mi Perfil",
        email: "Correo electrónico",
        notAvailable: "No disponible",
        photo: "Foto de perfil",
        noPhoto: "Sin foto",
        selectImage: "Seleccionar Imagen",
        processing: "Procesando...",
        imageUploaded: "Imagen subida correctamente",
        imageError: "Error al subir la imagen",
        imageHint: "JPG, PNG o GIF (se comprimirá a 500KB max)",
        
        name: "Nombre completo",
        namePlaceholder: "Tu nombre real...",
        
        username: "Nombre de usuario",
        usernamePlaceholder: "Ej: juan_perez",
        usernameHint: "Solo letras, números y guión bajo (_). Mínimo 3 caracteres, máximo 20.",
        checking: "⏳ Verificando...",
        available: "✅ Disponible",
        taken: "❌ Ya está en uso",
        
        country: "País",
        countryPlaceholder: "Tu país...",
        city: "Ciudad",
        cityPlaceholder: "Tu ciudad...",
        
        slogan: "Frase de propaganda / Eslogan",
        sloganPlaceholder: "Ej: Soluciones creativas y rápidas...",
        
        bio: "Biografía",
        bioPlaceholder: "Cuéntanos sobre ti, tu experiencia o intereses...",
        
        offer: "Oferta / Servicio / Especialidades",
        offerPlaceholder: "Describe qué ofreces o buscas (ej: Clases de programación, Diseño gráfico...)",
        
        save: "Guardar Perfil",
        saving: "Guardando...",
        
        updated: "Perfil actualizado correctamente",
        created: "Perfil creado correctamente",
        saveError: "Error al guardar el perfil",
        
        usernameMinLength: "El nombre de usuario debe tener al menos 3 caracteres",
        usernameTaken: "Ese nombre de usuario ya está en uso",
        
        backHome: "Volver al Inicio",
        
        // Eliminación de cuenta
        deleteAccount: "Eliminar mi cuenta",
        deleteWarning: "Esta acción es irreversible. Se eliminará permanentemente:",
        deleteItem1: "Tu cuenta de acceso",
        deleteItem2: "Tu perfil y todos tus datos",
        deleteItem3: "Todas tus imágenes de galería",
        deleteItem4: "Todos tus mensajes enviados y recibidos",
        deleteConfirm: "¿Estás seguro? Esta acción no se puede deshacer.",
        deleting: "Eliminando cuenta...",
        accountDeleted: "Cuenta eliminada exitosamente",
        deleteError: "Error al eliminar la cuenta. Intenta de nuevo.",
        
        confirmDelete: "Sí, eliminar mi cuenta"
      },

      // ==================== GALLERY ====================
      gallery: {
        title: "Mi Galería",
        subtitle: "Comparte imágenes de tus trabajos o servicios",
        select: "Seleccionar Imagen",
        uploading: "Subiendo...",
        description: "Descripción",
        descPlaceholder: "Describe esta imagen...",
        limitReached: "Has alcanzado el límite de 6 imágenes",
        noImages: "Aún no has subido imágenes",
        uploadFirst: "Sube tu primera imagen para mostrar tu trabajo",
        
        addNewImage: "Agregar Nueva Imagen",
        imagesCount: "Mis Imágenes",
        limitWarning: "Has alcanzado el límite de {{max}} imágenes. Elimina alguna para subir más.",
        compressing: "Comprimiendo imagen...",
        uploadingImage: "Subiendo imagen...",
        uploadSuccess: "Imagen subida correctamente",
        uploadError: "Error al subir la imagen",
        deleteConfirm: "¿Estás seguro de eliminar esta imagen?",
        deleteSuccess: "Imagen eliminada",
        deleteError: "Error al eliminar la imagen",
        updateSuccess: "Descripción actualizada",
        updateError: "Error al actualizar",
        backToProfile: "Volver al Perfil",
        goToHome: "Ir al Inicio",
        imageAlt: "Imagen de galería",
        loadingImage: "Cargando...",
        noImagesHint: "Comienza agregando tu primera imagen arriba",
        limitReachedButton: "🚫 Límite alcanzado",
        currentImages: "{{current}}/{{max}}"
      },

      // ==================== INBOX / MENSAJES ====================
      messages: {
        title: "📬 Bandeja de Entrada",
        subtitle: "Tus conversaciones",
        
        noConversations: "No tienes conversaciones todavía",
        noConversationsHint: "Visita el perfil de un usuario y envíale un mensaje",
        startConversation: "Explora usuarios y envía tu primer mensaje",
        exploreUsers: "Explorar Usuarios",
        
        loading: "Cargando mensajes...",
        you: "Tú:",
        unread: "nuevo",
        newMessages: "nuevos",
        
        backToHome: "Volver al Inicio",
        
        user: "Usuario",
        avatarAlt: "Foto de perfil",
        lastMessage: "Último mensaje",
        noName: "Sin nombre"
      },

      // ==================== PUBLIC PROFILE ====================
      public: {
        notFound: "Usuario no encontrado",
        notFoundDesc: "El perfil que buscas no existe o el nombre de usuario es incorrecto.",
        backHome: "Volver al Inicio",
        
        offer: "💼 Oferta / Servicio / Especialidades",
        
        messages: "💬 Mensajes",
        loginRequired: "Debes iniciar sesión para enviar mensajes",
        loginButton: "Iniciar Sesión",
        
        conversation: "Conversación",
        loadingMessages: "Cargando mensajes...",
        
        messagePlaceholder: "Escribe un mensaje a",
        send: "📤 Enviar Mensaje",
        sending: "Enviando...",
        
        gallery: "📸 Galería",
        images: "imágenes",
        image: "imagen",
        noGallery: "Este usuario aún no ha subido imágenes a su galería",
        
        noName: "Sin nombre",
        avatarAlt: "Foto de perfil",
        loading: "Cargando...",
        
        cannotSendToSelf: "⚠️ No puedes enviarte mensajes a ti mismo",
        messageSent: "✅ Mensaje enviado",
        messageError: "❌ Error al enviar el mensaje"
      },

      // ==================== USERS ====================
      users: {
        title: "Usuarios Registrados",
        searchPlaceholder: "Buscar por nombre, usuario, biografía u oferta...",
        searching: "Buscando...",
        resultsFound: "resultado",
        resultsFoundPlural: "resultados",
        found: "encontrado",
        noUsersFound: "No se encontraron usuarios con",
        noUsersYet: "No hay usuarios registrados todavía",
        showing: "Mostrando",
        users: "usuarios",
        hasMore: "(hay más disponibles)",
        loadMore: "Cargar más",
        loadMoreWithCount: "Cargar más ({{count}} más)",
        loadingMore: "Cargando...",
        allLoaded: "✅ Has visto todos los usuarios",
        noName: "Sin nombre",
        offer: "Oferta:",
        backToDashboard: "Volver al Dashboard",
        
        deleteUser: "Eliminar usuario",
        confirmDelete: "¿Estás seguro de eliminar a",
        userDeleted: "✅ Usuario eliminado correctamente",
        deleteError: "❌ Error al eliminar usuario"
      },

      // ==================== LOGIN ====================
      login: {
        welcome: "Bienvenido",
        subtitle: "Inicia sesión o crea tu cuenta",
        or: "O continúa con",
        google: "Continuar con Google",
        redirecting: "Redirigiendo al perfil...",
        
        emailLabel: "Correo Electrónico",
        emailPlaceholder: "Ingresa tu correo electrónico",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Crea una contraseña",
        confirmPasswordLabel: "Confirmar Contraseña",
        confirmPasswordPlaceholder: "Confirma tu contraseña",
        
        signIn: "Iniciar Sesión",
        signUp: "Crear cuenta",
        backToHome: "Volver al Inicio"
      },

      // ==================== HELP / AYUDA ====================
      help: {
        title: "❓ Ayuda - Cómo usar Ofertio",
        subtitle: "Guía completa para aprovechar al máximo la plataforma",
        
        section1Title: "📝 1. Inscripción",
        section2Title: "👤 2. Completar tu Perfil",
        section3Title: "🔍 3. Explorar Usuarios",
        section4Title: "💬 4. Enviar y Recibir Mensajes",
        section5Title: "🎯 5. Consejos para Aprovechar Ofertio",
        section6Title: "🔒 6. Seguridad y Privacidad",
        faqTitle: "❔ Preguntas Frecuentes",
        contactTitle: "📧 ¿Necesitas más ayuda?",

        createAccount: "Crear una cuenta",
        step1: "Haz clic en \"Iniciar Sesión\" en el menú superior",
        step2: "Selecciona la pestaña \"Crear cuenta\"",
        step3: "Ingresa tu correo electrónico y crea una contraseña segura",
        step4: "Confirma tu correo (recibirás un código de verificación)",
        step5: "O usa el botón \"Continuar con Google\" para registrarte con tu cuenta de Google",
        tipGoogle: "💡 Consejo: Usar Google es más rápido y no necesitas recordar otra contraseña.",

        completeProfile: "Configuración inicial",
        profileTip: "Una vez registrado, ve a \"Perfil\" en el menú y completa tu información:",
        photoProfile: "📷 Foto de Perfil",
        selectImage: "Seleccionar Imagen",
        photoCompress: "La imagen se comprimirá automáticamente (máximo 500KB)",
        fullName: "✏️ Nombre Completo",
        fullNameDesc: "Ingresa tu nombre real para que otros usuarios te reconozcan",
        username: "🆔 Nombre de Usuario (único)",
        usernameRules: "Crea un nombre de usuario único (sin espacios)",
        usernameChars: "Solo letras, números y guión bajo (_)",
        usernameLength: "Mínimo 3 caracteres, máximo 20",
        usernameCheck: "Verás ✅ si está disponible o ❌ si ya está en uso",
        bioLocation: "📖 Biografía/País/Ciudad",
        bioDesc: "Opcional: Cuéntanos sobre ti, tus intereses o experiencia",
        offerService: "💼 Oferta/Servicio/Especialidades",
        offerExamples: "Describe qué servicios ofreces o qué estás buscando",
        offerExamples2: "Ejemplos: \"Clases de programación\", \"C++\", \"Diseño gráfico\", \"Asesoría legal\"",
        saveProfileImportant: "⚠️ Importante: Haz clic en \"Guardar Perfil\" después de llenar la información.",

        addGallery: "🖼️ Agregar imágenes a tu Galería",
        galleryStep1: "Ve a \"Galería\" en el menú",
        galleryStep2: "Haz clic en \"Seleccionar Imagen\"",
        galleryStep3: "Puedes agregar una descripción opcional para cada imagen",
        galleryLimit: "Máximo 6 imágenes por usuario",
        galleryCompress: "Las imágenes se comprimen automáticamente",
        galleryTip: "💡 Consejo: Usa imágenes que muestren tus servicios o trabajos realizados.",

        exploreUsers: "Buscar y descubrir",
        homeSeeUsers: "En \"Inicio\" verás todos los usuarios registrados",
        useSearch: "Usa el buscador para encontrar por nombre, usuario, biografía u oferta",
        searchMultiple: "Puedes buscar con múltiples palabras (ej: \"diseño gráfico\")",
        clickUser: "Haz clic en cualquier usuario para ver su perfil completo",

        sendMessages: "Enviar un mensaje",
        goToProfile: "Entra al perfil del usuario que te interesa (haz clic en su tarjeta)",
        scrollToMessages: "Desplázate hasta la sección \"💬 Mensajes\"",
        writeMessage: "Escribe tu mensaje en el cuadro de texto",
        clickSend: "Haz clic en \"📤 Enviar Mensaje\"",
        messageTip: "💡 Consejo: Sé claro y respetuoso en tus mensajes. Menciona qué servicio te interesa.",

        viewMessages: "Ver tus mensajes",
        goToMessages: "Haz clic en \"📬 Mensajes\" en el menú",
        conversationsOrdered: "Verás todas tus conversaciones ordenadas por fecha",
        newMessagesIndicator: "Las conversaciones con mensajes nuevos mostrarán un número rojo",
        clickConversation: "Haz clic en una conversación para verla completa y responder",
        messagesNote: "📌 Nota: Los mensajes se marcan como leídos automáticamente cuando abres la conversación.",

        tipsTitle: "Consejos para Aprovechar Ofertio",
        tipCompleteProfile: "✨ Completa tu perfil",
        tipCompleteDesc: "Los usuarios con perfiles completos y fotos reciben más mensajes.",
        tipBeSpecific: "📝 Sé específico",
        tipSpecificDesc: "Describe claramente qué ofreces o qué buscas para atraer a las personas correctas.",
        tipProfessional: "🤝 Sé profesional",
        tipProfessionalDesc: "Responde los mensajes de manera oportuna y mantén una comunicación respetuosa.",
        tipUpdate: "🔄 Actualiza tu perfil",
        tipUpdateDesc: "Mantén tu información actualizada, especialmente tus servicios u ofertas.",

        securityTitle: "🔒 Seguridad y Privacidad",
        emailNotVisible: "Tu correo electrónico NO es visible para otros usuarios",
        onlyRegistered: "Solo los usuarios registrados pueden enviarte mensajes",
        deleteAccount: "Puedes eliminar tu cuenta en cualquier momento desde tu Perfil",
        deleteAllData: "Al eliminar tu cuenta se borran todos tus datos, imágenes y mensajes",
        neverShareSensitive: "Nunca compartas información sensible (números de cuenta, contraseñas) por mensajes",

        faqChangeUsername: "¿Puedo cambiar mi nombre de usuario?",
        faqChangeUsernameAnswer: "Sí, ve a tu Perfil, cambia el nombre de usuario y haz clic en \"Guardar Perfil\".",
        faqImageLimit: "¿Cuántas imágenes puedo subir?",
        faqImageLimitAnswer: "Puedes subir hasta 6 imágenes en tu Galería.",
        faqProfileVisits: "¿Puedo ver quién visitó mi perfil?",
        faqProfileVisitsAnswer: "Actualmente esta función no está disponible.",
        faqDeleteImage: "¿Cómo elimino una imagen de mi galería?",
        faqDeleteImageAnswer: "Ve a Galería, haz clic en el botón 🗑️ en la imagen que quieres eliminar.",
        faqMessagesPrivate: "¿Los mensajes son privados?",
        faqMessagesPrivateAnswer: "Sí, solo tú y el destinatario pueden ver la conversación.",

        needMoreHelp: "Si tienes preguntas adicionales o problemas técnicos, contáctanos a través de:",
        website: "Sitio web",
        supportDonation: "Apoya el proyecto con una donación",

        backHome: "← Volver al Inicio",
        startNow: "Comenzar Ahora →"
      },

      // ==================== ADD USER / ADMIN ====================
      admin: {
        title: "Agregar Usuario de Prueba",
        subtitle: "Crea usuarios de prueba para probar la búsqueda",
        
        form: {
          nameLabel: "Nombre *",
          namePlaceholder: "Ej: María González",
          usernameLabel: "Nombre de Usuario (único) *",
          usernamePlaceholder: "Ej: maria_gonzalez",
          bioLabel: "Biografía",
          bioPlaceholder: "Ej: Desarrolladora web con 5 años de experiencia...",
          offerLabel: "Oferta/Servicio",
          offerPlaceholder: "Ej: Desarrollo web, consultoría...",
        },

        usernameHint: "Solo letras, números y guión bajo (_). Mínimo 3 caracteres.",
        checking: "⏳ Verificando...",
        available: "✅ Disponible",
        taken: "❌ Ya está en uso",

        validation: {
          usernameMinLength: "El nombre de usuario debe tener al menos 3 caracteres",
          usernameTaken: "Ese nombre de usuario ya está en uso"
        },

        button: {
          addUser: "Agregar Usuario",
          adding: "Agregando...",
        },

        success: "✅ Usuario agregado correctamente",
        error: "❌ Error al agregar usuario",

        quickActions: {
          viewUsers: "Ver Usuarios",
          backHome: "Volver al Inicio"
        }
      },

      // ==================== COMMON ====================
      common: {
        loading: "Cargando...",
        error: "Error",
        success: "Éxito",
        cancel: "Cancelar",
        confirm: "Confirmar",
        delete: "Eliminar",
        edit: "Editar",
        save: "Guardar",
      },

      // ==================== FOOTER ====================
      footer: {
        tagline: "Conectando personas y oportunidades",
        copyright: "Todos los derechos reservados.",
        terms: "Términos de Uso",
        privacy: "Política de Privacidad",
        disclaimer: "Disclaimer",
        serviceDisclaimer: "Este servicio se proporciona \"tal cual\" sin garantías. El uso de esta plataforma es bajo su propio riesgo.",
        developedBy: "Desarrollado por",
        donate: "💝 Donar"
      },

            // ==================== TÉRMINOS DE USO ====================
      terms: {
        title: "📜 Términos de Uso",
        welcome: "Bienvenido:",
        welcomeText: "Al utilizar esta plataforma, usted acepta los siguientes términos y condiciones.",
        
        section1Title: "1. Aceptación de los Términos",
        section1Text: "Al acceder y utilizar este servicio, usted acepta estar sujeto a estos términos de uso y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no utilice este servicio.",
        
        section2Title: "2. Uso del Servicio",
        section2Intro: "Usted se compromete a:",
        section2Item1: "Proporcionar información veraz y actualizada",
        section2Item2: "No usar el servicio para fines ilegales o no autorizados",
        section2Item3: "No intentar acceder a cuentas de otros usuarios",
        section2Item4: "No transmitir virus, malware o código malicioso",
        section2Item5: "No acosar, abusar o dañar a otros usuarios",
        
        section3Title: "3. Cuenta de Usuario",
        section3Text: "Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Debe notificar inmediatamente cualquier uso no autorizado.",
        
        section4Title: "4. Contenido del Usuario",
        section4Text: "Usted retiene todos los derechos sobre el contenido que publique. Sin embargo, al publicar contenido, nos otorga una licencia mundial, no exclusiva y libre de regalías para usar, reproducir y mostrar dicho contenido en relación con el servicio.",
        
        section5Title: "5. Terminación",
        section5Text: "Nos reservamos el derecho de suspender o terminar su acceso al servicio en cualquier momento, sin previo aviso, por conducta que consideremos inapropiada o por violación de estos términos.",
        
        section6Title: "6. Modificaciones",
        section6Text: "Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio después de dichas modificaciones constituye su aceptación de los nuevos términos.",
        
        section7Title: "7. Contacto",
        section7Text: "Si tiene preguntas sobre estos términos, puede contactarnos a través de los canales oficiales proporcionados en la plataforma.",
        
        lastUpdated: "Última actualización:",
        backToHome: "Volver al inicio"
      },
            // ==================== POLÍTICA DE PRIVACIDAD ====================
      privacy: {
        title: "🔒 Política de Privacidad",
        welcome: "Su privacidad es importante:",
        welcomeText: "Esta política describe cómo recopilamos, usamos y protegemos su información.",
        
        section1Title: "1. Información que Recopilamos",
        section1Intro: "Recopilamos la siguiente información:",
        section1Account: "Información de cuenta: nombre, email, país, ciudad",
        section1Offers: "Información de ofertas: especialidades, ofertas publicadas",
        section1Usage: "Datos de uso: logs de acceso, dirección IP",
        section1Cookies: "Cookies: para mantener su sesión activa",
        
        section2Title: "2. Cómo Usamos su Información",
        section2Intro: "Utilizamos su información para:",
        section2Item1: "Proporcionar y mantener el servicio",
        section2Item2: "Autenticar su identidad",
        section2Item3: "Comunicarnos con usted sobre actualizaciones",
        section2Item4: "Mejorar la experiencia del usuario",
        section2Item5: "Prevenir fraude y abuso",
        section2Item6: "Cumplir con obligaciones legales",
        
        section3Title: "3. Compartir Información",
        section3NoSell: "NO vendemos su información personal.",
        section3Intro: "Solo compartimos información cuando:",
        section3Item1: "Usted nos da permiso explícito",
        section3Item2: "Es necesario para proporcionar el servicio",
        section3Item3: "Es requerido por ley o autoridad competente",
        section3Item4: "Es necesario para proteger nuestros derechos legales",
        
        section4Title: "4. Seguridad de los Datos",
        section4Intro: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información, incluyendo:",
        section4Item1: "Encriptación de contraseñas",
        section4Item2: "Conexiones HTTPS seguras",
        section4Item3: "Acceso restringido a datos personales",
        section4Item4: "Monitoreo de actividad sospechosa",
        section4Note: "Nota: Ningún método de transmisión por Internet es 100% seguro. No podemos garantizar la seguridad absoluta de sus datos.",
        
        section5Title: "5. Sus Derechos",
        section5Intro: "Usted tiene derecho a:",
        section5Access: "Acceso: solicitar una copia de sus datos",
        section5Correction: "Corrección: actualizar información incorrecta",
        section5Deletion: "Eliminación: solicitar la eliminación de su cuenta",
        section5Portability: "Portabilidad: recibir sus datos en formato estructurado",
        section5Objection: "Objeción: oponerse al procesamiento de sus datos",
        section5Contact: "Para ejercer estos derechos, contacte con nosotros a través de los canales oficiales.",
        
        section6Title: "6. Cookies",
        section6Text: "Utilizamos cookies para mantener su sesión activa y mejorar su experiencia. Puede configurar su navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.",
        
        section7Title: "7. Retención de Datos",
        section7Text: "Conservamos su información personal mientras su cuenta esté activa o según sea necesario para proporcionar servicios. Puede solicitar la eliminación de su cuenta en cualquier momento.",
        
        section8Title: "8. Cambios a esta Política",
        section8Text: "Podemos actualizar esta política periódicamente. Le notificaremos de cambios significativos publicando la nueva política en esta página y actualizando la fecha de \"última actualización\".",
        
        section9Title: "9. Cumplimiento Legal",
        section9Text: "Esta política cumple con las regulaciones aplicables, incluyendo GDPR (Unión Europea) y otras leyes de protección de datos relevantes para nuestros usuarios.",
        
        lastUpdated: "Última actualización:",
        backToHome: "Volver al inicio"
      },
            // ==================== DISCLAIMER LEGAL ====================
      disclaimer: {
        title: "⚖️ Disclaimer Legal",
        important: "Importante:",
        importantText: "Lea atentamente este disclaimer antes de usar la plataforma.",
        
        section1Title: "1. Limitación de Responsabilidad",
        section1Text: "Este software se proporciona \"TAL CUAL\" sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo, pero no limitado a, garantías implícitas de comerciabilidad, idoneidad para un propósito particular y no infracción.",
        
        section2Title: "2. Exención de Garantías",
        section2Intro: "Los desarrolladores NO garantizan que:",
        section2Item1: "El servicio estará disponible sin interrupciones",
        section2Item2: "Los errores serán corregidos",
        section2Item3: "El servicio estará libre de virus o componentes dañinos",
        section2Item4: "Los resultados del uso del servicio serán precisos o confiables",
        
        section3Title: "3. Responsabilidades del Usuario",
        section3Intro: "El usuario es el único responsable de:",
        section3Item1: "El uso que haga de la información proporcionada en la plataforma",
        section3Item2: "Cumplir con las leyes locales, estatales, nacionales e internacionales",
        section3Item3: "Obtener los consentimientos necesarios de terceros",
        section3Item4: "La seguridad de sus credenciales de acceso",
        section3Item5: "Las consecuencias de cualquier acción tomada basada en la información del servicio",
        
        section4Title: "4. Protección de Datos",
        section4Text: "El usuario declara ser consciente de sus obligaciones bajo las leyes de protección de datos aplicables (GDPR, CCPA, etc.) y se compromete a cumplir con todas las regulaciones pertinentes.",
        
        section5Title: "5. Indemnización",
        section5Text: "El usuario acuerda indemnizar, defender y eximir de responsabilidad a los desarrolladores de cualquier reclamo, pérdida, responsabilidad, daño, costo o gasto (incluyendo honorarios razonables de abogados) que surja del uso del servicio.",
        
        section6Title: "6. Sin Garantía de Disponibilidad",
        section6Text: "No garantizamos que el servicio esté disponible en todo momento. Podemos suspender, retirar, descontinuar o cambiar cualquier aspecto del servicio sin previo aviso.",
        
        section7Title: "7. Modificaciones",
        section7Text: "Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio constituye la aceptación de dichas modificaciones.",
        
        section8Title: "8. Jurisdicción",
        section8Text: "Estos términos se rigen por las leyes de Perú, sin tener en cuenta sus disposiciones sobre conflictos de leyes.",
        
        riskWarning: "⚠️ USO BAJO SU PROPIO RIESGO",
        riskText: "Al usar esta plataforma, usted acepta expresamente que el uso es bajo su propio riesgo.",
        
        lastUpdated: "Última actualización:",
        backToHome: "Volver al inicio"
      },
    }
  },

  en: {
    translation: {
      // ==================== NAVBAR ====================
      nav: {
        home: "Home",
        messages: "📬 Messages",
        profile: "Profile",
        gallery: "Gallery",
        users: "Users",
        help: "❓ Help",
        login: "Login",
        logout: "Logout",
      },

            // ==================== HOME ====================
      home: {
        adminPanel: "Admin Panel",
        title: "Our Users and Offers",
        search: "Search by name, username, bio or offer...",
        searching: "Searching...",
        searchingUsers: "Searching users...",
        result: "result",
        found: "found",
        noResults: "No users found with",
        noUsers: "No users registered yet",
        noName: "No name",
        city: "City",
        offerAndSpecialties: "Offer and specialties",
        loadMore: "Load more users",
        showingAll: "Showing all users",
        loading: "Loading users..."
      },

      // ==================== PROFILE ====================
      profile: {
        title: "My Profile",
        email: "Email",
        notAvailable: "Not available",
        photo: "Profile picture",
        noPhoto: "No photo",
        selectImage: "Select Image",
        processing: "Processing...",
        imageUploaded: "Image uploaded successfully",
        imageError: "Error uploading image",
        imageHint: "JPG, PNG or GIF (will be compressed to 500KB max)",
        
        name: "Full name",
        namePlaceholder: "Your real name...",
        
        username: "Username",
        usernamePlaceholder: "Ex: john_doe",
        usernameHint: "Only letters, numbers and underscore (_). Minimum 3 characters, maximum 20.",
        checking: "⏳ Checking...",
        available: "✅ Available",
        taken: "❌ Already taken",
        
        country: "Country",
        countryPlaceholder: "Your country...",
        city: "City",
        cityPlaceholder: "Your city...",
        
        slogan: "Tagline / Slogan",
        sloganPlaceholder: "Ex: Creative and fast solutions...",
        
        bio: "Biography",
        bioPlaceholder: "Tell us about yourself, your experience or interests...",
        
        offer: "Offer / Service / Specialties",
        offerPlaceholder: "Describe what you offer or are looking for (e.g. Programming classes, Graphic design...)",
        
        save: "Save Profile",
        saving: "Saving...",
        
        updated: "Profile updated successfully",
        created: "Profile created successfully",
        saveError: "Error saving profile",
        
        usernameMinLength: "Username must be at least 3 characters",
        usernameTaken: "That username is already taken",
        
        backHome: "Back to Home",
        
        deleteAccount: "Delete my account",
        deleteWarning: "This action is irreversible. The following will be permanently deleted:",
        deleteItem1: "Your access account",
        deleteItem2: "Your profile and all your data",
        deleteItem3: "All your gallery images",
        deleteItem4: "All sent and received messages",
        deleteConfirm: "Are you sure? This action cannot be undone.",
        deleting: "Deleting account...",
        accountDeleted: "Account deleted successfully",
        deleteError: "Error deleting account. Please try again.",
        
        confirmDelete: "Yes, delete my account"
      },

      // ==================== GALLERY ====================
      gallery: {
        title: "My Gallery",
        subtitle: "Share images of your work or services",
        select: "Select Image",
        uploading: "Uploading...",
        description: "Description",
        descPlaceholder: "Describe this image...",
        limitReached: "You've reached the limit of 6 images",
        noImages: "You haven't uploaded any images yet",
        uploadFirst: "Upload your first image to showcase your work",
        
        addNewImage: "Add New Image",
        imagesCount: "My Images",
        limitWarning: "You've reached the limit of {{max}} images. Delete some to upload more.",
        compressing: "Compressing image...",
        uploadingImage: "Uploading image...",
        uploadSuccess: "Image uploaded successfully",
        uploadError: "Error uploading image",
        deleteConfirm: "Are you sure you want to delete this image?",
        deleteSuccess: "Image deleted successfully",
        deleteError: "Error deleting image",
        updateSuccess: "Description updated successfully",
        updateError: "Error updating description",
        backToProfile: "Back to Profile",
        goToHome: "Go to Home",
        imageAlt: "Gallery image",
        loadingImage: "Loading...",
        noImagesHint: "Start by adding your first image above",
        limitReachedButton: "🚫 Limit reached",
        currentImages: "{{current}}/{{max}}"
      },

      // ==================== INBOX / MESSAGES ====================
      messages: {
        title: "📬 Inbox",
        subtitle: "Your conversations",
        
        noConversations: "You have no conversations yet",
        noConversationsHint: "Visit a user's profile and send them a message",
        startConversation: "Explore users and send your first message",
        exploreUsers: "Explore Users",
        
        loading: "Loading messages...",
        you: "You:",
        unread: "new",
        newMessages: "new",
        
        backToHome: "Back to Home",
        
        user: "User",
        avatarAlt: "Profile picture",
        lastMessage: "Last message",
        noName: "No name"
      },

      // ==================== PUBLIC PROFILE ====================
      public: {
        notFound: "User not found",
        notFoundDesc: "The profile you're looking for doesn't exist or the username is incorrect.",
        backHome: "Back to Home",
        
        offer: "💼 Offer / Service / Specialties",
        
        messages: "💬 Messages",
        loginRequired: "You must log in to send messages",
        loginButton: "Login",
        
        conversation: "Conversation",
        loadingMessages: "Loading messages...",
        
        messagePlaceholder: "Write a message to",
        send: "📤 Send Message",
        sending: "Sending...",
        
        gallery: "📸 Gallery",
        images: "images",
        image: "image",
        noGallery: "This user hasn't uploaded any images to their gallery yet",
        
        noName: "No name",
        avatarAlt: "Profile picture",
        loading: "Loading...",
        
        cannotSendToSelf: "⚠️ You cannot send messages to yourself",
        messageSent: "✅ Message sent",
        messageError: "❌ Error sending message"
      },

      // ==================== USERS ====================
      users: {
        title: "Registered Users",
        searchPlaceholder: "Search by name, username, bio or offer...",
        searching: "Searching...",
        resultsFound: "result",
        resultsFoundPlural: "results",
        found: "found",
        noUsersFound: "No users found with",
        noUsersYet: "No users registered yet",
        showing: "Showing",
        users: "users",
        hasMore: "(more available)",
        loadMore: "Load more",
        loadMoreWithCount: "Load more ({{count}} more)",
        loadingMore: "Loading...",
        allLoaded: "✅ You've seen all users",
        noName: "No name",
        offer: "Offer:",
        backToDashboard: "Back to Dashboard",
        
        deleteUser: "Delete user",
        confirmDelete: "Are you sure you want to delete",
        userDeleted: "✅ User deleted successfully",
        deleteError: "❌ Error deleting user"
      },

      // ==================== LOGIN ====================
      login: {
        welcome: "Welcome",
        subtitle: "Log in or create your account",
        or: "Or continue with",
        google: "Continue with Google",
        redirecting: "Redirecting to profile...",
        
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email address",
        passwordLabel: "Password",
        passwordPlaceholder: "Create a password",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your password",
        
        signIn: "Sign In",
        signUp: "Create Account",
        backToHome: "Back to Home"
      },

      // ==================== HELP ====================
      help: {
        title: "❓ Help - How to use Ofertio",
        subtitle: "Complete guide to make the most of the platform",
        
        section1Title: "📝 1. Registration",
        section2Title: "👤 2. Complete Your Profile",
        section3Title: "🔍 3. Explore Users",
        section4Title: "💬 4. Send and Receive Messages",
        section5Title: "🎯 5. Tips to Get the Most out of Ofertio",
        section6Title: "🔒 6. Security and Privacy",
        faqTitle: "❔ Frequently Asked Questions",
        contactTitle: "📧 Need More Help?",

        createAccount: "Create an account",
        step1: "Click on \"Login\" in the top menu",
        step2: "Select the \"Create account\" tab",
        step3: "Enter your email and create a secure password",
        step4: "Confirm your email (you will receive a verification code)",
        step5: "Or use the \"Continue with Google\" button to register with your Google account",
        tipGoogle: "💡 Tip: Using Google is faster and you don't need to remember another password.",

        completeProfile: "Initial setup",
        profileTip: "Once registered, go to \"Profile\" in the menu and complete your information:",
        photoProfile: "📷 Profile Photo",
        selectImage: "Select Image",
        photoCompress: "The image will be automatically compressed (max 500KB)",
        fullName: "✏️ Full Name",
        fullNameDesc: "Enter your real name so other users can recognize you",
        username: "🆔 Username (unique)",
        usernameRules: "Create a unique username (no spaces)",
        usernameChars: "Only letters, numbers and underscore (_)",
        usernameLength: "Minimum 3 characters, maximum 20",
        usernameCheck: "You will see ✅ if available or ❌ if already taken",
        bioLocation: "📖 Bio/Country/City",
        bioDesc: "Optional: Tell us about yourself, your interests or experience",
        offerService: "💼 Offer/Service/Specialties",
        offerExamples: "Describe what services you offer or what you are looking for",
        offerExamples2: "Examples: \"Programming classes\", \"C++\", \"Graphic design\", \"Legal advice\"",
        saveProfileImportant: "⚠️ Important: Click \"Save Profile\" after filling in the information.",

        addGallery: "🖼️ Add images to your Gallery",
        galleryStep1: "Go to \"Gallery\" in the menu",
        galleryStep2: "Click \"Select Image\"",
        galleryStep3: "You can add an optional description for each image",
        galleryLimit: "Maximum 6 images per user",
        galleryCompress: "Images are automatically compressed",
        galleryTip: "💡 Tip: Use images that show your services or completed work.",

        exploreUsers: "Search and discover",
        homeSeeUsers: "On \"Home\" you will see all registered users",
        useSearch: "Use the search bar to find by name, username, bio or offer",
        searchMultiple: "You can search with multiple words (e.g. \"graphic design\")",
        clickUser: "Click on any user to see their full profile",

        sendMessages: "Send a message",
        goToProfile: "Go to the profile of the user you are interested in (click on their card)",
        scrollToMessages: "Scroll to the \"💬 Messages\" section",
        writeMessage: "Write your message in the text box",
        clickSend: "Click \"📤 Send Message\"",
        messageTip: "💡 Tip: Be clear and respectful in your messages. Mention what service interests you.",

        viewMessages: "View your messages",
        goToMessages: "Click on \"📬 Messages\" in the menu",
        conversationsOrdered: "You will see all your conversations ordered by date",
        newMessagesIndicator: "Conversations with new messages will show a red number",
        clickConversation: "Click on a conversation to view it fully and reply",
        messagesNote: "📌 Note: Messages are automatically marked as read when you open the conversation.",

        tipsTitle: "Tips to Get the Most out of Ofertio",
        tipCompleteProfile: "✨ Complete your profile",
        tipCompleteDesc: "Users with complete profiles and photos receive more messages.",
        tipBeSpecific: "📝 Be specific",
        tipSpecificDesc: "Clearly describe what you offer or what you are looking for to attract the right people.",
        tipProfessional: "🤝 Be professional",
        tipProfessionalDesc: "Reply to messages promptly and maintain respectful communication.",
        tipUpdate: "🔄 Update your profile",
        tipUpdateDesc: "Keep your information updated, especially your services or offers.",

        securityTitle: "🔒 Security and Privacy",
        emailNotVisible: "Your email address is NOT visible to other users",
        onlyRegistered: "Only registered users can send you messages",
        deleteAccount: "You can delete your account at any time from your Profile",
        deleteAllData: "When you delete your account, all your data, images and messages will be deleted",
        neverShareSensitive: "Never share sensitive information (account numbers, passwords) via messages",

        faqChangeUsername: "Can I change my username?",
        faqChangeUsernameAnswer: "Yes, go to your Profile, change the username and click \"Save Profile\".",
        faqImageLimit: "How many images can I upload?",
        faqImageLimitAnswer: "You can upload up to 6 images in your Gallery.",
        faqProfileVisits: "Can I see who visited my profile?",
        faqProfileVisitsAnswer: "This feature is currently not available.",
        faqDeleteImage: "How do I delete an image from my gallery?",
        faqDeleteImageAnswer: "Go to Gallery and click the 🗑️ button on the image you want to delete.",
        faqMessagesPrivate: "Are messages private?",
        faqMessagesPrivateAnswer: "Yes, only you and the recipient can see the conversation.",

        needMoreHelp: "If you have additional questions or technical issues, contact us through:",
        website: "Website",
        supportDonation: "Support the project with a donation",

        backHome: "← Back to Home",
        startNow: "Start Now →"
      },

      // ==================== ADD USER / ADMIN ====================
      admin: {
        title: "Add Test User",
        subtitle: "Create test users to test the search functionality",
        
        form: {
          nameLabel: "Name *",
          namePlaceholder: "Ex: Maria Gonzalez",
          usernameLabel: "Username (unique) *",
          usernamePlaceholder: "Ex: maria_gonzalez",
          bioLabel: "Bio",
          bioPlaceholder: "Ex: Web developer with 5 years of experience...",
          offerLabel: "Offer/Service",
          offerPlaceholder: "Ex: Web development, consulting...",
        },

        usernameHint: "Only letters, numbers and underscore (_). Minimum 3 characters.",
        checking: "⏳ Checking...",
        available: "✅ Available",
        taken: "❌ Already taken",

        validation: {
          usernameMinLength: "Username must be at least 3 characters",
          usernameTaken: "That username is already taken"
        },

        button: {
          addUser: "Add User",
          adding: "Adding...",
        },

        success: "✅ User added successfully",
        error: "❌ Error adding user",

        quickActions: {
          viewUsers: "View Users",
          backHome: "Back to Home"
        }
      },

      // ==================== COMMON ====================
      common: {
        loading: "Loading...",
        error: "Error",
        success: "Success",
        cancel: "Cancel",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
        save: "Save",
      },

      // ==================== FOOTER ====================
      footer: {
        tagline: "Connecting people and opportunities",
        copyright: "All rights reserved.",
        terms: "Terms of Use",
        privacy: "Privacy Policy",
        disclaimer: "Disclaimer",
        serviceDisclaimer: "This service is provided \"as is\" without warranties. Use of this platform is at your own risk.",
        developedBy: "Developed by",
        donate: "💝 Donate"
      },
            // ==================== TERMS OF USE ====================
      terms: {
        title: "📜 Terms of Use",
        welcome: "Welcome:",
        welcomeText: "By using this platform, you agree to the following terms and conditions.",
        
        section1Title: "1. Acceptance of Terms",
        section1Text: "By accessing and using this service, you agree to be bound by these terms of use and all applicable laws and regulations. If you do not agree with any of these terms, do not use this service.",
        
        section2Title: "2. Use of the Service",
        section2Intro: "You agree to:",
        section2Item1: "Provide truthful and up-to-date information",
        section2Item2: "Not use the service for illegal or unauthorized purposes",
        section2Item3: "Not attempt to access other users' accounts",
        section2Item4: "Not transmit viruses, malware or malicious code",
        section2Item5: "Not harass, abuse or harm other users",
        
        section3Title: "3. User Account",
        section3Text: "You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.",
        
        section4Title: "4. User Content",
        section4Text: "You retain all rights to the content you post. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the service.",
        
        section5Title: "5. Termination",
        section5Text: "We reserve the right to suspend or terminate your access to the service at any time, without prior notice, for conduct we deem inappropriate or for violation of these terms.",
        
        section6Title: "6. Modifications",
        section6Text: "We reserve the right to modify these terms at any time. Your continued use of the service after such modifications constitutes your acceptance of the new terms.",
        
        section7Title: "7. Contact",
        section7Text: "If you have any questions about these terms, you can contact us through the official channels provided on the platform.",
        
        lastUpdated: "Last updated:",
        backToHome: "Back to home"
      },
            // ==================== PRIVACY POLICY ====================
      privacy: {
        title: "🔒 Privacy Policy",
        welcome: "Your privacy is important:",
        welcomeText: "This policy describes how we collect, use and protect your information.",
        
        section1Title: "1. Information We Collect",
        section1Intro: "We collect the following information:",
        section1Account: "Account information: name, email, country, city",
        section1Offers: "Offer information: specialties, published offers",
        section1Usage: "Usage data: access logs, IP address",
        section1Cookies: "Cookies: to keep your session active",
        
        section2Title: "2. How We Use Your Information",
        section2Intro: "We use your information to:",
        section2Item1: "Provide and maintain the service",
        section2Item2: "Authenticate your identity",
        section2Item3: "Communicate with you about updates",
        section2Item4: "Improve user experience",
        section2Item5: "Prevent fraud and abuse",
        section2Item6: "Comply with legal obligations",
        
        section3Title: "3. Sharing Information",
        section3NoSell: "We do NOT sell your personal information.",
        section3Intro: "We only share information when:",
        section3Item1: "You give us explicit permission",
        section3Item2: "It is necessary to provide the service",
        section3Item3: "It is required by law or competent authority",
        section3Item4: "It is necessary to protect our legal rights",
        
        section4Title: "4. Data Security",
        section4Intro: "We implement technical and organizational security measures to protect your information, including:",
        section4Item1: "Password encryption",
        section4Item2: "Secure HTTPS connections",
        section4Item3: "Restricted access to personal data",
        section4Item4: "Monitoring of suspicious activity",
        section4Note: "Note: No method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.",
        
        section5Title: "5. Your Rights",
        section5Intro: "You have the right to:",
        section5Access: "Access: request a copy of your data",
        section5Correction: "Correction: update incorrect information",
        section5Deletion: "Deletion: request deletion of your account",
        section5Portability: "Portability: receive your data in a structured format",
        section5Objection: "Objection: object to the processing of your data",
        section5Contact: "To exercise these rights, please contact us through the official channels.",
        
        section6Title: "6. Cookies",
        section6Text: "We use cookies to keep your session active and improve your experience. You can configure your browser to reject cookies, but this may affect the functionality of the site.",
        
        section7Title: "7. Data Retention",
        section7Text: "We retain your personal information while your account is active or as necessary to provide services. You may request deletion of your account at any time.",
        
        section8Title: "8. Changes to this Policy",
        section8Text: "We may update this policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the \"last updated\" date.",
        
        section9Title: "9. Legal Compliance",
        section9Text: "This policy complies with applicable regulations, including GDPR (European Union) and other data protection laws relevant to our users.",
        
        lastUpdated: "Last updated:",
        backToHome: "Back to home"
      },
            // ==================== LEGAL DISCLAIMER ====================
      disclaimer: {
        title: "⚖️ Legal Disclaimer",
        important: "Important:",
        importantText: "Please read this disclaimer carefully before using the platform.",
        
        section1Title: "1. Limitation of Liability",
        section1Text: "This software is provided \"AS IS\" without warranties of any kind, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement.",
        
        section2Title: "2. Disclaimer of Warranties",
        section2Intro: "The developers do NOT warrant that:",
        section2Item1: "The service will be available without interruptions",
        section2Item2: "Errors will be corrected",
        section2Item3: "The service will be free of viruses or harmful components",
        section2Item4: "The results of using the service will be accurate or reliable",
        
        section3Title: "3. User Responsibilities",
        section3Intro: "The user is solely responsible for:",
        section3Item1: "The use they make of the information provided on the platform",
        section3Item2: "Complying with local, state, national and international laws",
        section3Item3: "Obtaining necessary consents from third parties",
        section3Item4: "The security of their access credentials",
        section3Item5: "The consequences of any action taken based on the service information",
        
        section4Title: "4. Data Protection",
        section4Text: "The user declares to be aware of their obligations under applicable data protection laws (GDPR, CCPA, etc.) and undertakes to comply with all relevant regulations.",
        
        section5Title: "5. Indemnification",
        section5Text: "The user agrees to indemnify, defend and hold harmless the developers from any claim, loss, liability, damage, cost or expense (including reasonable attorneys' fees) arising from the use of the service.",
        
        section6Title: "6. No Warranty of Availability",
        section6Text: "We do not warrant that the service will be available at all times. We may suspend, withdraw, discontinue or change any aspect of the service without prior notice.",
        
        section7Title: "7. Modifications",
        section7Text: "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of such modifications.",
        
        section8Title: "8. Jurisdiction",
        section8Text: "These terms are governed by the laws of Peru, without regard to its conflict of laws provisions.",
        
        riskWarning: "⚠️ USE AT YOUR OWN RISK",
        riskText: "By using this platform, you expressly agree that the use is at your own risk.",
        
        lastUpdated: "Last updated:",
        backToHome: "Back to home"
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;