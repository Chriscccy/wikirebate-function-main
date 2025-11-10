// lib/utils/rescc.js
export function rescc(res) {
  res.cc = function (message = 'OK', statusCode = 200, data = null) {
    if (typeof res.status === 'function') res.status(statusCode);
    return res.json({
      success: statusCode >= 200 && statusCode < 300,
      message,
      data,
    });
  };
  return res;
}
