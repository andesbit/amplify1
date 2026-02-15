import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
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
});