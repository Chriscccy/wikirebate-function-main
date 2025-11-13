// import { useCurrentUser } from '../../lib/utils/useCurrentUser.js';
// import { createDocument } from '../../lib/utils/createDocument.js';
// import { config } from '../../lib/appwrite.js';
import { rescc } from '../../lib/utils/rescc.js';

export async function test_handler(req, res, log) {
  rescc(res);

  log('✅ test_handler reached');
  try {
    req.body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { name, email, country, phone } = req.body;
    // const { userId, email, name } = await useCurrentUser(req);

    // const document = await createDocument({
    //   collectionId: config.col.userInfo,
    //   documentId: userId,
    //   data: { name, email, phone },
    // });
    // log('📦 原始 req.body:', req.body);
    // log('form 收集到的资料', req.body.name);
    // log('form 收集到的资料', req.body.email);
    // log('form 收集到的资料', req.body.country);
    // log('form 收集到的资料', req.body.phone);
    log('------------------------------jaja :', name);
    console.log('------------------------------jaja :', name);
    log('✅ test_handler run all');
    res.cc(req.body, 200, { timestamp: Date.now() }); // ✅ return
  } catch (err) {
    res.cc(err.message, err.statusCode || 500); // ✅ return
  }
}
