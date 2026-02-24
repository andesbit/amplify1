import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({  
  UserProfile: a
    .model({
      userId: a.string().required(),
      name: a.string(),
      userName: a.string().required(),
      bio: a.string(),
      offer: a.string(),
      profilePicture: a.string(),
      images: a.hasMany('UserImage', 'userId'),  // ← AGREGA ESTA LÍNEA
    })
    .authorization((allow) => [
      allow.owner(),
      allow.publicApiKey().to(['read'])
    ])
    .secondaryIndexes((index) => [
      index('userName')
    ]),

  UserImage: a
    .model({
      userId: a.string().required(),
      imagePath: a.string().required(),
      description: a.string(),
      order: a.integer(),
      userProfile: a.belongsTo('UserProfile', 'userId'),  // ← Ya estaba
    })
    .authorization((allow) => [
      allow.owner(),
      allow.publicApiKey().to(['read'])
    ]),

  Message: a
    .model({
      senderId: a.string().required(),  // ← Cambié de fromUserId
      receiverId: a.string().required(),  // ← Cambié de toUserId
      content: a.string().required(),
      read: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.owner()
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 365
    }
  },
});