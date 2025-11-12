// lib/utils/rescc.js
export function rescc(res) {
  res.cc = function (message = 'OK', statusCode = 200, data = null) {
    const safeCode = typeof statusCode === 'number' ? statusCode : 500;
    if (typeof res.status === 'function') res.status(safeCode);
    return res.json({
      success: safeCode >= 200 && safeCode < 300,
      message,
      data,
    });
  };
  return res;
}
