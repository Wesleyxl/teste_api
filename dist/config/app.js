"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config({
  path: ".env",
});

exports. default = {
  app_name: process.env.APP_NAME || "API Rabecão",
  url: process.env.APP_URL || "http://localhost",
  port: process.env.APP_PORT || 8080,
};
