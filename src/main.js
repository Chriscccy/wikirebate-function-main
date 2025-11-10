import { ping_handler } from './functions/ping.js';
import { newUser_handler } from './functions/auth/newUser.js';

// export default async ({ req, res, log }) => {
//   const body = req.body || {}; // ✅ Appwrite 自动解析好了
//   log('用原始方法');

//   try {
//     switch (req.path) {
//       case '/ping': {
//         return await ping_handler(req, res, log);
//       }

//       case '/auth/newUser': {
//         return await newUser_handler(req, res);
//       }

//       default:
//         return res.json({ status: 404, message: 'API Not Found' });
//     }
//   } catch (err) {
//     log('❌ 路由执行失败:', err.message);
//     return res.json({ error: err.message }, 500);
//   }
// };

const routes = {
  '/ping': ping_handler,
  '/auth/newUser': newUser_handler,
};

export default async ({ req, res, log }) => {
  log('✅ 路由分发开始:', req.path);

  const handler = routes[req.path];

  try {
    if (handler) {
      return await handler(req, res, log);
    } else {
      return res.json({ status: 404, message: 'API Not Found' });
    }
  } catch (err) {
    log('❌ 路由执行失败:', err.message);
    return res.json({ error: err.message }, 500);
  }
};
