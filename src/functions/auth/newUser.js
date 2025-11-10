import { useCurrentUser } from '../../lib/utils/useCurrentUser.js';
import { createDocument } from '../../lib/utils/createDocument.js';
import { config } from '../../lib/appwrite.js';

export async function newUser_handler(req, res) {
  try {
    const { phone } = req.body;
    const { userId, email, name } = await useCurrentUser(req);

    const document = await createDocument({
      collectionId: config.col.userInfo,
      documentId: userId,
      data: { name, email, phone },
    });

    return res.status(200).json({ success: true, document });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
}
