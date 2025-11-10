import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './src/routes/index.js';

const app = express();
app.use(bodyParser.json());

for (const path in routes) {
  app.post(path, routes[path]); // 直接注册所有路径
}

app.use((req, res) => {
  res.status(404).json({ error: 'Route not handled' });
});

app.listen(8800, () =>
  console.log('🚀 本地服务器运行在 http://localhost:8800')
);
