import { routes } from './routes/index.js';
import { safeParsePayload } from './lib/utils/safeParsePayload.js';

export default async ({ req, res, log }) => {
  const body = safeParsePayload(req.payload); // ✅ 使用局部变量
  log('✅ 已经通过payload验证');
  const handler = routes[req.path] || routes[req.path.replace(/^\/|\/$/g, '')];
  if (!handler) return res.json({ error: 'Unknown path' }, 404);

  return await handler(
    { ...req, body },
    {
      status: (code) => ({
        json: (data) => res.json(data, code),
        text: (text) => res.send(text, code),
      }),
    }
  );
};
