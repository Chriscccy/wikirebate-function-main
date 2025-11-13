import { routes } from './routes/index.js';

export default async ({ req, res, log }) => {
  const allowedOrigins = [
    'https://member.wikirebate.com',
    'https://admin.wikirebate.com',
  ];

  const origin = req.headers.origin || '';
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const corsHeaders = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, x-appwrite-user-jwt',
    'Access-Control-Allow-Credentials': 'true',
  };

  log('✅ 路由分发开始:', req.path);

  // OPTIONS 预检：必须立即返回并携带 CORS 头（不继续走 handler）
  if (req.method === 'OPTIONS') {
    log('✅ OPTIONS 请求已处理');
    return res.json({}, 200, corsHeaders);
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
