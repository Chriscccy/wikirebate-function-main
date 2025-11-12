import { ping_handler } from '../functions/ping.js';
import { newUser_handler } from '../functions/auth/newUser.js';
import { test_handler } from '../functions/auth/test.js';

export const routes = {
  '/ping': ping_handler,
  // '/auth/newUser': test_handler,
  // '/auth/newUser': newUser_handler,
  // '/auth/test': test_handler,
};
