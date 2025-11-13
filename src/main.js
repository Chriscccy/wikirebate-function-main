import { routes } from './routes/index.js';
import { rescc, corsHeadersFor } from './lib/utils/rescc.js';

export default async ({ req, res, log }) => {
  const origin = req.headers.origin || '';
  // 包装 res，使 handler 可使用 res.cc(...)
  res = rescc(res, origin);

  const corsHeaders = corsHeadersFor(origin);

  log('✅ 路由分发开始:', req.path, 'method:', req.method, 'origin:', origin);

  // 预检请求立即返回并带上 CORS 头
  if (req.method === 'OPTIONS') {
    log('✅ OPTIONS 请求已处理');
    return res.json({}, 200, corsHeaders);
  }

  const handler = routes[req.path];
  try {
    if (!handler) {
      return res.json(
        { status: 404, message: 'API Not Found' },
        404,
        corsHeaders
      );
    }

    // 推荐：handler return 数据由 main 统一响应
    const result = await handler(req, res, log);

    // 如果 handler 已自行使用 res.cc 或 res.json 并结束（返回 undefined）
    if (result === undefined) return;

    // 由 main 统一返回，保证带上 CORS 头
    return res.json(result, 200, corsHeaders);
  } catch (err) {
    log('❌ 路由执行失败:', err.message);
    return res.json({ error: err.message }, 500, corsHeaders);
  }
};
