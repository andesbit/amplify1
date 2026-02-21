import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile', 'openid'],           // bien, estos son los recomendados
        attributeMapping: {
          email: 'email',
          givenName: 'given_name',
          familyName: 'family_name',
          // Puedes agregar más si necesitas (ej. name, picture)
          // name: 'name',
          // picture: 'picture',
        },
      },
      // ← Aquí van callbackUrls y logoutUrls (al mismo nivel que google)
      callbackUrls: [
        // Para desarrollo local
        'http://localhost:3000/',
        'http://localhost:3000/profile',

        // Para la rama de producción en Amplify (manténlas por si pruebas ahí)
        'https://main.d2npvh5w3g4srb.amplifyapp.com/',
        'https://main.d2npvh5w3g4srb.amplifyapp.com/profile',

        // ← ¡Faltaban estas! Agrega tu dominio real
        'https://ofertio.net/',
        'https://ofertio.net/profile',
        'https://www.ofertio.net/',           // si usas www en algún momento
        'https://www.ofertio.net/profile',
      ],
      logoutUrls: [
        'http://localhost:3000/',
        'https://main.d2npvh5w3g4srb.amplifyapp.com/',

        // ← Agrega también para logout
        'https://ofertio.net/',
        'https://www.ofertio.net/',
      ],
    },
  },
  // Opcional: activa protección contra eliminación accidental del User Pool
  // (muy recomendado en producción)
});

// Protección contra recreación accidental del User Pool (agrega al final)
const { cfnUserPool } = auth.resources.cfnResources;
cfnUserPool.deletionProtection = 'ACTIVE';