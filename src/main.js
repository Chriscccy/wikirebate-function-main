import { routes } from './routes/index.js';

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
