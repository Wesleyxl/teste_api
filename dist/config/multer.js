"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

function randomNumber() {
  return Math.floor(Math.random() * 1000 + 1000);
}










const multerConfigUser = {
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      const error = new (0, _multer.MulterError)("LIMIT_UNEXPECTED_FILE");
      error.message = "File must be an image";
      callback(error);
    } else {
      callback(null, true);
    }
  },

  storage: _multer2.default.diskStorage({
    destination: (req, file, callback) => {
      callback(
        null,
        _path.resolve.call(void 0, __dirname, "..", "..", "public", "images", "users")
      );
    },
    filename: (req, file, callback) => {
      callback(
        null,
        `${Date.now()}_${randomNumber()}${_path.extname.call(void 0, file.originalname)}}`
      );
    },
  }),
};

exports.multerConfigUser = multerConfigUser;
