import { ID, Permission, Role } from 'node-appwrite';
import { config } from '../appwrite.js';

export const createDocument = async ({
  collectionId,
  userId,
  data,
  documentId = ID.unique(),
}) => {
  const permission = [
    Permission.read(Role.user(userId)),
    Permission.read(Role.team('Admin')),
    Permission.update(Role.team('Admin')),
  ];
  return await database.createDocument(
    config.db,
    collectionId,
    documentId,
    { ...data },
    permission
  );
};
