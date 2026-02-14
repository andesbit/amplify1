import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        // Opcional: scopes si quieres limitar/expandir permisos
        // scopes: ['profile', 'email'],
        // Opcional: attributeMapping si necesitas mapear atributos de Google a Cognito
        // attributeMapping: { email: 'email', name: 'name' }
      },
    },
    // ← Aquí van las URLs de redirección (al mismo nivel que externalProviders)
    callbackUrls: [
      'http://localhost:3000/',
      'http://localhost:3000/profile',
      'https://main.d2npvh5w3g4srb.amplifyapp.com/',
      'https://main.d2npvh5w3g4srb.amplifyapp.com/profile',
    ],
    logoutUrls: [
      'http://localhost:3000/',
      'https://main.d2npvh5w3g4srb.amplifyapp.com/',
    ],
  },
});