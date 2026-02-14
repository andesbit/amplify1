import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,  // o phone: true, etc. si lo usas
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        // Opcional pero recomendado:
        scopes: ['profile', 'email', 'openid'],  // para obtener email y nombre
        // attributeMapping: { email: 'email', name: 'name' }  // si necesitas mapear atributos
      },
      // Si agregas más proveedores (facebook, apple, oidc, saml), van aquí al mismo nivel
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
  },
  // Otras configs globales si las tienes: userAttributes, multifactor, etc.
});