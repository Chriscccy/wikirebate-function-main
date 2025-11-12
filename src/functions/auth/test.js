import { useCurrentUser } from '../../lib/utils/useCurrentUser.js';
import { createDocument } from '../../lib/utils/createDocument.js';
import { config } from '../../lib/appwrite.js';
import { rescc } from '../../lib/utils/rescc.js';

export async function test_handler(req, res, log) {
  rescc(res);

  try {
    const { name, email, country, phone } = req.body;
    // const { userId, email, name } = await useCurrentUser(req);

    // const document = await createDocument({
    //   collectionId: config.col.userInfo,
    //   documentId: userId,
    //   data: { name, email, phone },
    // });
    console.log(name);
    console.log(email);
    console.log(country);
    console.log(phone);
    return res.cc('ping ping biang biang', 200, { timestamp: Date.now() }); // ✅ return
  } catch (err) {
    return res.cc(err.message, err.statusCode || 500); // ✅ return
  }
}
