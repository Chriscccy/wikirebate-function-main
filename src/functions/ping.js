import { rescc } from '../lib/utils/rescc.js';

export async function ping_handler(req, res, log) {
  rescc(res); // ✅ 注入 res.cc
  log('✅ ping_handler reached');

  try {
    return res.cc('ping ping biang biang', 200, { timestamp: Date.now() }); // ✅ return
  } catch (err) {
    return res.cc(err.message, err.statusCode || 500); // ✅ return
  }
}
