"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config({
  path: ".env",
});

exports. default = {
  jwt_secret: process.env.JWT_SECRET || "secret",
  jwt_expire_in: process.env.JWT_EXPIRE_IN || "1h",
};
