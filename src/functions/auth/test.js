// import { useCurrentUser } from '../../lib/utils/useCurrentUser.js';
// import { createDocument } from '../../lib/utils/createDocument.js';
// import { config } from '../../lib/appwrite.js';
import { rescc } from '../../lib/utils/rescc.js';

export async function test_handler(req, res, log) {
  rescc(res);

  log('✅ test_handler reached');
  try {
    // req.body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const payload =
      typeof req.body === 'string' && req.body
        ? JSON.parse(req.body)
        : req.body || {};

    // const { name, email, country, phone } = req.body;
    // const { userId, email, name } = await useCurrentUser(req);

    // const document = await createDocument({
    //   collectionId: config.col.userInfo,
    //   documentId: userId,
    //   data: { name, email, phone },
    // });

    log('payload.email:', payload.email);
    // res.cc(req.body, 200, { timestamp: Date.now() }); // ✅ return
    return {
      status: 200,
      message: 'OK',
      data: { timestamp: Date.now(), received: payload },
    };
  } catch (err) {
    // res.cc(err.message, err.statusCode || 500); // ✅ return
    return {
      status: err.statusCode || 500,
      message: err.message || 'Internal Error',
    };
  }
}
