import { generateClient } from 'aws-amplify/data';

let apiKeyClient = null;
let userPoolClient = null;

export function getClient(authMode = 'apiKey') {
  if (authMode === 'userPool') {
    if (!userPoolClient) {
      userPoolClient = generateClient({ authMode: 'userPool' });
    }
    return userPoolClient;
  } else {
    if (!apiKeyClient) {
      apiKeyClient = generateClient({ authMode: 'apiKey' });
    }
    return apiKeyClient;
  }
}