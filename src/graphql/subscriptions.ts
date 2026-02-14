/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onCreateMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onCreateUserImage = /* GraphQL */ `subscription OnCreateUserImage(
  $filter: ModelSubscriptionUserImageFilterInput
  $owner: String
) {
  onCreateUserImage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserImageSubscriptionVariables,
  APITypes.OnCreateUserImageSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onCreateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onDeleteMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
export const onDeleteUserImage = /* GraphQL */ `subscription OnDeleteUserImage(
  $filter: ModelSubscriptionUserImageFilterInput
  $owner: String
) {
  onDeleteUserImage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserImageSubscriptionVariables,
  APITypes.OnDeleteUserImageSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onDeleteUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onUpdateMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onUpdateUserImage = /* GraphQL */ `subscription OnUpdateUserImage(
  $filter: ModelSubscriptionUserImageFilterInput
  $owner: String
) {
  onUpdateUserImage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserImageSubscriptionVariables,
  APITypes.OnUpdateUserImageSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onUpdateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
