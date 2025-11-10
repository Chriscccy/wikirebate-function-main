import { routes } from './routes/index.js';

export default async ({ req, res }) => {
  req.body = JSON.parse(req.payload || '{}'); // Appwrite 的请求体是字符串

  const handler = routes[req.path];
  if (!handler) return res.json({ error: 'Unknown path' }, 404);

  return await handler(req, {
    status: (code) => ({
      json: (data) => res.json(data, code),
      text: (text) => res.send(text, code),
    }),
  });
};
