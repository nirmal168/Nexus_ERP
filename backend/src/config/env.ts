import "dotenv/config";

const env = {
  DATABASE_URL: process.env["DATABASE_URL"] as string,
  JWT_SECRET: process.env["JWT_SECRET"] as string,
  PORT: Number(process.env["PORT"]) || 5000,
  NODE_ENV: process.env["NODE_ENV"] ?? "development",
  FRONTEND_URL: process.env["FRONTEND_URL"] ?? "http://localhost:5173",
  // AWS vars are optional — only required for file uploads
  AWS_ACCESS_KEY_ID: process.env["AWS_ACCESS_KEY_ID"] ?? "",
  AWS_SECRET_ACCESS_KEY: process.env["AWS_SECRET_ACCESS_KEY"] ?? "",
  AWS_BUCKET_NAME: process.env["AWS_BUCKET_NAME"] ?? "",
};

// Only these are truly required to boot the server
const required = ["DATABASE_URL", "JWT_SECRET"] as const;
const missing = required.filter((key) => !env[key] || env[key] === "");

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}\n\nPlease create a .env file in the backend/ folder. See .env.example for reference.`);
}

export default env;
