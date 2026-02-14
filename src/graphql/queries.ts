/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const getUserImage = /* GraphQL */ `query GetUserImage($id: ID!) {
  getUserImage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserImageQueryVariables,
  APITypes.GetUserImageQuery
>;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const listUserImages = /* GraphQL */ `query ListUserImages(
  $filter: ModelUserImageFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      description
      id
      imagePath
      order
      owner
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserImagesQueryVariables,
  APITypes.ListUserImagesQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
