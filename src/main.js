import { routes } from './routes/index.js';

export default async ({ req, res, log }) => {
  const body = req.body || {}; // ✅ Appwrite 自动解析好了
  log('Request body:', body);

  const handler = routes[req.path];
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
