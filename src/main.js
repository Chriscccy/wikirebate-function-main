import { ping_handler } from './functions/ping.js';
import { newUser_handler } from './functions/auth/newUser.js';

export default async ({ req, res, log }) => {
  const body = req.body || {}; // ✅ Appwrite 自动解析好了
  log('用原始方法');

  try {
    switch (req.path) {
      case '/ping': {
        return await ping_handler(req, res);
      }

      case '/auth/newUser': {
        return await newUser_handler(req, res);
      }

      default:
        return res.json({ status: 404, message: 'API Not Found' });
    }
  } catch (err) {
    log('❌ 路由执行失败:', err.message);
    return res.json({ error: err.message }, 500);
  }

  // const handler = routes[req.path];
  // if (!handler) return res.json({ error: 'Unknown path' }, 404);

  // return await handler(
  //   { ...req, body },
  //   {
  //     status: (code) => ({
  //       json: (data) => res.json(data, code),
  //       text: (text) => res.send(text, code),
  //     }),
  //   }
  // );
};
