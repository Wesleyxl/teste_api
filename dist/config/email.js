"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config({
  path: ".env",
});

exports. default = {
  host: process.env.EMAIL_HOST || "smtp.endereco.com",
  port: process.env.EMAIL_PORT || 465,
  secure: process.env.EMAIL_SECURE || true,
  auth: {
    user: process.env.EMAIL_USER || "seu@email.com",
    pass: process.env.EMAIL_PASSWORD || "suaSenha",
  },
};
