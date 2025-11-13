// lib/utils/rescc.js
export const allowedOrigins = [
  'https://member.wikirebate.com',
  'https://admin.wikirebate.com',
];

export function corsHeadersFor(origin = '') {
  const isAllowed = allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, x-appwrite-user-jwt',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// 扩展 res，添加 res.cc 并保留能被 main 统一覆盖的行为
export function rescc(res, origin = '') {
  // 保留原始 res.json 以便 main 可调用
  const originalJson = res.json && res.json.bind(res);

  // 新增快捷方法：res.cc(bodyMessage, statusCode, data, headers?)
  res.cc = function (
    message = 'OK',
    statusCode = 200,
    data = null,
    extraHeaders = {}
  ) {
    const safeCode = typeof statusCode === 'number' ? statusCode : 500;
    // 构造返回体
    const body = {
      success: safeCode >= 200 && safeCode < 300,
      message,
      data,
    };
    // 合并 CORS header 与额外 header（extraHeaders 优先）
    const headers = { ...corsHeadersFor(origin), ...extraHeaders };
    // 使用 Appwrite 的 res.json(body, status, headers)
    return originalJson ? originalJson(body, safeCode, headers) : null;
  };

  // 返回包装后的 res 以便链式使用
  return res;
}
