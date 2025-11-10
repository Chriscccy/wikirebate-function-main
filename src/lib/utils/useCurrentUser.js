import { Client, Account } from 'node-appwrite';
import { config } from '../appwrite.js';

export async function useCurrentUser(req) {
  const jwt = req.headers['x-appwrite-jwt'];
  if (!jwt) throw Object.assign(new Error('Missing JWT'), { statusCode: 401 });

  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setJWT(jwt);

  const account = new Account(client);
  const user = await account.get();

  return {
    userId: user.$id,
    email: user.email,
    name: user.name,
  };
}
