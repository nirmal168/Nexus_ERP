import app from "./app.js";
import prisma from "./config/db.js";
import env from "./config/env.js";

const PORT = Number(process.env.PORT) || env.PORT || 5000;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT} [${env.NODE_ENV}]`);
});

// Connect to database in the background without blocking server startup
prisma
  .$connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server...");
  server.close(() => {
    prisma.$disconnect();
    process.exit(0);
  });
});
