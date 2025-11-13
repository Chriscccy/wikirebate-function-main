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

export function rescc(res, origin = '') {
  const originalJson = res.json && res.json.bind(res);

  res.cc = function (
    message = 'OK',
    statusCode = 200,
    data = null,
    extraHeaders = {}
  ) {
    const safeCode = typeof statusCode === 'number' ? statusCode : 500;
    const body = { success: safeCode >= 200 && safeCode < 300, message, data };
    const headers = { ...corsHeadersFor(origin), ...extraHeaders };
    return originalJson ? originalJson(body, safeCode, headers) : null;
  };

  return res;
}
