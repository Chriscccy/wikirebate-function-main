import { rescc } from '../lib/utils/rescc.js';

export async function ping_handler(req, res, log) {
  rescc(res);
  log('✅ ping_handler reached');
  try {
    return res.cc('ping ping biang biang', 200, { timestamp: Date.now() });
  } catch (err) {
    log('❌ ping_handler error:', err.message);
    return res.cc(err.message, err.statusCode || 500);
  }
}
