import { routes } from './routes/index.js';

export default async ({ req, res }) => {
  const body = JSON.parse(req.payload || '{}'); // ✅ 使用局部变量

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
