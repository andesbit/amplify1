/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $condition: ModelMessageConditionInput
  $input: CreateMessageInput!
) {
  createMessage(condition: $condition, input: $input) {
    content
    createdAt
    fromUserId
    id
    owner
    read
    toUserId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const createUserImage = /* GraphQL */ `mutation CreateUserImage(
  $condition: ModelUserImageConditionInput
  $input: CreateUserImageInput!
) {
  createUserImage(condition: $condition, input: $input) {
    createdAt
    description
    id
    imagePath
    order
    owner
    updatedAt
    userId
    userProfile {
      age
      bio
      createdAt
      id
      name
      offer
      owner
      profilePicture
      updatedAt
      userId
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserImageMutationVariables,
  APITypes.CreateUserImageMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: CreateUserProfileInput!
) {
  createUserProfile(condition: $condition, input: $input) {
    age
    bio
    createdAt
    id
    images {
      nextToken
      __typename
    }
    name
    offer
    owner
    profilePicture
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $condition: ModelMessageConditionInput
  $input: DeleteMessageInput!
) {
  deleteMessage(condition: $condition, input: $input) {
    content
    createdAt
    fromUserId
    id
    owner
    read
    toUserId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const deleteUserImage = /* GraphQL */ `mutation DeleteUserImage(
  $condition: ModelUserImageConditionInput
  $input: DeleteUserImageInput!
) {
  deleteUserImage(condition: $condition, input: $input) {
    createdAt
    description
    id
    imagePath
    order
    owner
    updatedAt
    userId
    userProfile {
      age
      bio
      createdAt
      id
      name
      offer
      owner
      profilePicture
      updatedAt
      userId
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserImageMutationVariables,
  APITypes.DeleteUserImageMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: DeleteUserProfileInput!
) {
  deleteUserProfile(condition: $condition, input: $input) {
    age
    bio
    createdAt
    id
    images {
      nextToken
      __typename
    }
    name
    offer
    owner
    profilePicture
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $condition: ModelMessageConditionInput
  $input: UpdateMessageInput!
) {
  updateMessage(condition: $condition, input: $input) {
    content
    createdAt
    fromUserId
    id
    owner
    read
    toUserId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const updateUserImage = /* GraphQL */ `mutation UpdateUserImage(
  $condition: ModelUserImageConditionInput
  $input: UpdateUserImageInput!
) {
  updateUserImage(condition: $condition, input: $input) {
    createdAt
    description
    id
    imagePath
    order
    owner
    updatedAt
    userId
    userProfile {
      age
      bio
      createdAt
      id
      name
      offer
      owner
      profilePicture
      updatedAt
      userId
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserImageMutationVariables,
  APITypes.UpdateUserImageMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: UpdateUserProfileInput!
) {
  updateUserProfile(condition: $condition, input: $input) {
    age
    bio
    createdAt
    id
    images {
      nextToken
      __typename
    }
    name
    offer
    owner
    profilePicture
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
