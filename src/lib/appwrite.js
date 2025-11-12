// @/lib/appwrite.js
import { Client, Account, Databases, Users } from 'node-appwrite';
import dotenv from 'dotenv';
dotenv.config(); // ✅ 必须在任何 config 使用之前调用

const config = {
  endpoint: process.env.APPWRITE_FUNCTION_API_ENDPOINT,
  projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID,
  db: process.env.APPWRITE_FUNCTION_DB_ID,
  apiKey: process.env.APPWRITE_FUNCTION_API_KEY_ADMIN,

  col: {
    userInfo: process.env.APPWRITE_FUNCTION_COL_USER_INFO,
  },
};

const adminClient = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setKey(config.apiKey);

const admin = new Users(adminClient);
const database = new Databases(adminClient);

export { database, config, admin };
