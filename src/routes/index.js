import { ping_handler } from '../functions/ping.js';
import { newUser_handler } from '../functions/auth/newUser.js';

export const routes = {
  '/ping': ping_handler,
  '/auth/newUser': newUser_handler,
};
