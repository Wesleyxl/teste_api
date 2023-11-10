import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "abc123**",
  database: process.env.DB_DATABASE || "rabecao_homolog",
  host: process.env.DB_HOST || "34.95.231.113",
  dialect: process.env.DB_DRIVE || "mysql",
  drive: process.env.DB_DRIVE || "mysql",
  define: {
    timestamps: false,
  },
};
