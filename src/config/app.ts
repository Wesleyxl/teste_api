import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export default {
  app_name: process.env.APP_NAME || "API Rabecão",
  url: process.env.APP_URL || "http://35.170.105.96",
  port: process.env.APP_PORT || 8080,
};
