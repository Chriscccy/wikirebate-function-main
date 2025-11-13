import { routes } from './routes/index.js';
import { rescc, corsHeadersFor } from './lib/utils/rescc.js';

export default async ({ req, res, log }) => {
  const origin = req.headers.origin || '';
  // 包装 res，供 handler 使用 res.cc 时自动带 header
  res = rescc(res, origin);

  const cors = corsHeadersFor(origin);

  log('➡️ route:', req.path, 'method:', req.method, 'origin:', origin);

  // 预检立即返回
  if (req.method === 'OPTIONS') {
    log('✅ OPTIONS handled');
    return res.json({}, 200, cors);
  }

  const handler = routes[req.path];
  try {
    if (!handler)
      return res.json({ status: 404, message: 'API Not Found' }, 404, cors);

    const result = await handler(req, res, log);

    // handler 若已自行用 res.cc/res.json 返回，则 result === undefined
    if (result === undefined) return;

    // main 统一响应，确保包含 CORS header
    return res.json(
      result,
      result && result.status ? result.status : 200,
      cors
    );
  } catch (err) {
    log('❌ handler failed:', err.message);
    return res.json({ error: err.message }, 500, cors);
  }
};
