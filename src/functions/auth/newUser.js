// import { useCurrentUser } from '../../lib/utils/useCurrentUser.js';
import { createDocument } from '../../lib/utils/createDocument.js';
import { ID } from 'node-appwrite';
import { config, client, account } from '../../lib/appwrite.js';
import { rescc } from '../../lib/utils/rescc.js';

export async function newUser_handler(req, res, log) {
  rescc(res);

  log('✅ newUser_handler reached');
  try {
    const payload =
      typeof req.body === 'string' && req.body
        ? JSON.parse(req.body)
        : req.body || {};

    log('📦 raw body:', req.body);
    log('📦 parsed payload:', payload);
    log('📦 password:', payload.password);

    const user = await account.create(
      ID.unique(),
      payload.email,
      payload.password,
      payload.name
    );

    // const { userId, email, name } = await useCurrentUser(req);

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

    log('payload.email:', payload.email);

    return {
      status: 200,
      message: 'OK',
      data: {
        timestamp: Date.now(),
        dataPayload: payload,
        dataReqBody: req.body,
      },
    };
  } catch (err) {
    log('❌ error stack:', err.stack);
    log('❌ error message:', err.message);
    log('❌ error object:', JSON.stringify(err));

    return {
      status: err.statusCode || 500,
      message: err.message || 'Internal Error',
    };
  }
}
