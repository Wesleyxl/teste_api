"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config({ path: ".env" });

exports. default = {
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
