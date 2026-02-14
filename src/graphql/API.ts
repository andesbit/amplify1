/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Message = {
  __typename: "Message",
  content: string,
  createdAt?: string | null,
  fromUserId: string,
  id: string,
  owner?: string | null,
  read?: boolean | null,
  toUserId: string,
  updatedAt: string,
};

export type UserImage = {
  __typename: "UserImage",
  createdAt: string,
  description?: string | null,
  id: string,
  imagePath: string,
  order?: number | null,
  owner?: string | null,
  updatedAt: string,
  userId: string,
  userProfile?: UserProfile | null,
};

export type UserProfile = {
  __typename: "UserProfile",
  age?: number | null,
  bio?: string | null,
  createdAt: string,
  id: string,
  images?: ModelUserImageConnection | null,
  name?: string | null,
  offer?: string | null,
  owner?: string | null,
  profilePicture?: string | null,
  updatedAt: string,
  userId: string,
};

export type ModelUserImageConnection = {
  __typename: "ModelUserImageConnection",
  items:  Array<UserImage | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  and?: Array< ModelMessageFilterInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  fromUserId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelMessageFilterInput | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  read?: ModelBooleanInput | null,
  toUserId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type ModelUserImageFilterInput = {
  and?: Array< ModelUserImageFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  imagePath?: ModelStringInput | null,
  not?: ModelUserImageFilterInput | null,
  or?: Array< ModelUserImageFilterInput | null > | null,
  order?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelUserProfileFilterInput = {
  age?: ModelIntInput | null,
  and?: Array< ModelUserProfileFilterInput | null > | null,
  bio?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelUserProfileFilterInput | null,
  offer?: ModelStringInput | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  owner?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelMessageConditionInput = {
  and?: Array< ModelMessageConditionInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  fromUserId?: ModelStringInput | null,
  not?: ModelMessageConditionInput | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  owner?: ModelStringInput | null,
  read?: ModelBooleanInput | null,
  toUserId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMessageInput = {
  content: string,
  createdAt?: string | null,
  fromUserId: string,
  id?: string | null,
  read?: boolean | null,
  toUserId: string,
};

export type ModelUserImageConditionInput = {
  and?: Array< ModelUserImageConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  not?: ModelUserImageConditionInput | null,
  or?: Array< ModelUserImageConditionInput | null > | null,
  order?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateUserImageInput = {
  description?: string | null,
  id?: string | null,
  imagePath: string,
  order?: number | null,
  userId: string,
};

export type ModelUserProfileConditionInput = {
  age?: ModelIntInput | null,
  and?: Array< ModelUserProfileConditionInput | null > | null,
  bio?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelUserProfileConditionInput | null,
  offer?: ModelStringInput | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  owner?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateUserProfileInput = {
  age?: number | null,
  bio?: string | null,
  id?: string | null,
  name?: string | null,
  offer?: string | null,
  profilePicture?: string | null,
  userId: string,
};

export type DeleteMessageInput = {
  id: string,
};

export type DeleteUserImageInput = {
  id: string,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type UpdateMessageInput = {
  content?: string | null,
  createdAt?: string | null,
  fromUserId?: string | null,
  id: string,
  read?: boolean | null,
  toUserId?: string | null,
};

export type UpdateUserImageInput = {
  description?: string | null,
  id: string,
  imagePath?: string | null,
  order?: number | null,
  userId?: string | null,
};

export type UpdateUserProfileInput = {
  age?: number | null,
  bio?: string | null,
  id: string,
  name?: string | null,
  offer?: string | null,
  profilePicture?: string | null,
  userId?: string | null,
};

export type ModelSubscriptionMessageFilterInput = {
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  fromUserId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  read?: ModelSubscriptionBooleanInput | null,
  toUserId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionUserImageFilterInput = {
  and?: Array< ModelSubscriptionUserImageFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  imagePath?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserImageFilterInput | null > | null,
  order?: ModelSubscriptionIntInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  age?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  bio?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  offer?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  owner?: ModelStringInput | null,
  profilePicture?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type GetUserImageQueryVariables = {
  id: string,
};

export type GetUserImageQuery = {
  getUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      content: string,
      createdAt?: string | null,
      fromUserId: string,
      id: string,
      owner?: string | null,
      read?: boolean | null,
      toUserId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserImagesQueryVariables = {
  filter?: ModelUserImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserImagesQuery = {
  listUserImages?:  {
    __typename: "ModelUserImageConnection",
    items:  Array< {
      __typename: "UserImage",
      createdAt: string,
      description?: string | null,
      id: string,
      imagePath: string,
      order?: number | null,
      owner?: string | null,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: CreateMessageInput,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type CreateUserImageMutationVariables = {
  condition?: ModelUserImageConditionInput | null,
  input: CreateUserImageInput,
};

export type CreateUserImageMutation = {
  createUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: CreateUserProfileInput,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: DeleteMessageInput,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserImageMutationVariables = {
  condition?: ModelUserImageConditionInput | null,
  input: DeleteUserImageInput,
};

export type DeleteUserImageMutation = {
  deleteUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: DeleteUserProfileInput,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: UpdateMessageInput,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserImageMutationVariables = {
  condition?: ModelUserImageConditionInput | null,
  input: UpdateUserImageInput,
};

export type UpdateUserImageMutation = {
  updateUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: UpdateUserProfileInput,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserImageSubscriptionVariables = {
  filter?: ModelSubscriptionUserImageFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserImageSubscription = {
  onCreateUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserImageSubscriptionVariables = {
  filter?: ModelSubscriptionUserImageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserImageSubscription = {
  onDeleteUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    content: string,
    createdAt?: string | null,
    fromUserId: string,
    id: string,
    owner?: string | null,
    read?: boolean | null,
    toUserId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserImageSubscriptionVariables = {
  filter?: ModelSubscriptionUserImageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserImageSubscription = {
  onUpdateUserImage?:  {
    __typename: "UserImage",
    createdAt: string,
    description?: string | null,
    id: string,
    imagePath: string,
    order?: number | null,
    owner?: string | null,
    updatedAt: string,
    userId: string,
    userProfile?:  {
      __typename: "UserProfile",
      age?: number | null,
      bio?: string | null,
      createdAt: string,
      id: string,
      name?: string | null,
      offer?: string | null,
      owner?: string | null,
      profilePicture?: string | null,
      updatedAt: string,
      userId: string,
    } | null,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    age?: number | null,
    bio?: string | null,
    createdAt: string,
    id: string,
    images?:  {
      __typename: "ModelUserImageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    offer?: string | null,
    owner?: string | null,
    profilePicture?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};
