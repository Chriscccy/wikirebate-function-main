import { Client, Account } from 'node-appwrite';
import { config, client, account } from '../appwrite.js';

export async function useCurrentUser(req) {
  const jwt = req.headers['x-appwrite-jwt'];
  if (!jwt) throw Object.assign(new Error('Missing JWT'), { statusCode: 401 });
  await client.setJWT(jwt);
  const user = await account.get();

  return {
    userId: user.$id,
    email: user.email,
    name: user.name,
  };
}
