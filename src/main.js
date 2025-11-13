import { routes } from './routes/index.js';

export default async ({ req, res, log }) => {
  log('✅ 路由分发开始:', req.path);

  // ✅ 自动识别请求来源（用于 CORS）
  const origin = req.headers.origin || 'https://member.wikirebate.com';

  // ✅ 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    log('✅ OPTIONS 请求已处理');
    return res.json({}, 200, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, x-appwrite-user-jwt',
      'Access-Control-Allow-Credentials': 'true',
    });
  }

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
