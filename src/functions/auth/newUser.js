import { createDocument } from '../../lib/utils/createDocument.js';
import { ID } from 'node-appwrite';
import { config, account } from '../../lib/appwrite.js';

export async function newUser_handler(req, res, log) {
  log('✅ newUser_handler reached');
  try {
    const payload =
      typeof req.body === 'string' && req.body
        ? JSON.parse(req.body)
        : req.body || {};

    const user = await account.create(
      ID.unique(),
      payload.email,
      payload.password,
      payload.name
    );

    await createDocument({
      collectionId: config.col.userInfo,
      documentId: user.$id,
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
      },
    });

    return {
      status: 200,
      message: 'OK',
    };
  } catch (err) {
    if (err.code === 409) {
      // 邮箱已存在
      return {
        status: 409,
        message: 'Email already registered',
      };
    }
    return {
      status: err.statusCode || 500,
      message: err.message || 'Internal Error',
    };
  }
}
