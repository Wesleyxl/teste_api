import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export default {
  host: process.env.EMAIL_HOST || "smtp.endereco.com",
  port: process.env.EMAIL_PORT || 465,
  secure: process.env.EMAIL_SECURE || true,
  auth: {
    user: process.env.EMAIL_USER || "seu@email.com",
    pass: process.env.EMAIL_PASSWORD || "suaSenha",
  },
};
