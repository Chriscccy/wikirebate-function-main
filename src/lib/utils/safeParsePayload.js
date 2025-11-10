// src/lib/utils/safeParsePayload.js

/**
 * 安全解析 JSON 字符串，避免空值或格式错误导致崩溃
 * @param {string} payload - 原始字符串
 * @param {object} options - 可选配置
 * @param {boolean} options.throwOnInvalid - 是否在解析失败时抛出错误
 * @returns {object} - 解析后的对象或空对象
 */
export function safeParsePayload(payload, { throwOnInvalid = false } = {}) {
  if (typeof payload !== 'string' || payload.trim() === '') return {};
  try {
    return JSON.parse(payload);
  } catch (err) {
    console.error(
      'Payload JSON parse error:',
      err.message,
      'payload:',
      payload
    );
    if (throwOnInvalid) {
      const e = new Error('Invalid JSON payload');
      e.statusCode = 400;
      throw e;
    }
    return {};
  }
}
