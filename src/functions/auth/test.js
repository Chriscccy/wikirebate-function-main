// import { useCurrentUser } from '../../lib/utils/useCurrentUser.js';
// import { createDocument } from '../../lib/utils/createDocument.js';
// import { config } from '../../lib/appwrite.js';
import { rescc } from '../../lib/utils/rescc.js';

export async function test_handler(req, res, log) {
  rescc(res);

  log('✅ test_handler reached');
  try {
    const { name, email, country, phone } = req.body;
    // const { userId, email, name } = await useCurrentUser(req);

    // const document = await createDocument({
    //   collectionId: config.col.userInfo,
    //   documentId: userId,
    //   data: { name, email, phone },
    // });
    log('📦 原始 req.body:', req.body);
    log('form 收集到的资料', name);
    log('form 收集到的资料', email);
    log('form 收集到的资料', country);
    log('form 收集到的资料', phone);
    return res.cc('ping ping biang biang', 200, { timestamp: Date.now() }); // ✅ return
  } catch (err) {
    return res.cc(err.message, err.statusCode || 500); // ✅ return
  }
}
