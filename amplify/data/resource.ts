import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({  
  UserProfile: a
    .model({
      userId: a.string().required(),
      name: a.string(),
      username: a.string().required(),
      bio: a.string(),
      offer: a.string(),
      profilePicture: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.publicApiKey().to(['read'])  // ← AGREGA ESTO
    ])
    .secondaryIndexes((index) => [
      index('username')
    ]),
    
  UserImage: a
    .model({
      userId: a.string().required(),
      imagePath: a.string().required(),
      description: a.string(),
      order: a.integer(),
      userProfile: a.belongsTo('UserProfile', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.publicApiKey().to(['read'])
    ]),

  Message: a
    .model({
      fromUserId: a.string().required(),
      toUserId: a.string().required(),
      content: a.string().required(),
      read: a.boolean().default(false),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['create', 'read']),
      allow.owner().to(['read', 'update', 'delete'])
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
