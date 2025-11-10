import { rescc } from '../lib/utils/rescc.js';

export async function ping_handler(res) {
  rescc(res); // ✅ 注入 res.cc 方法
  try {
    return res.cc('ping ping biang biang', 200, { timestamp: Date.now() });
  } catch (err) {
    return res.cc(err.message, err.statusCode || 500);
  }
}
