import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export default {
  app_name: process.env.APP_NAME || "API Rabecão",
  url: process.env.APP_URL || "http://172.26.10.169",
  port: process.env.APP_PORT || 8080,
};
