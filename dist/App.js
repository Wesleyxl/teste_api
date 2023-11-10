"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path');

var _database = require('./database'); var _database2 = _interopRequireDefault(_database);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

_dotenv2.default.config();

class App {
  
  

  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middleware();
    this.database();
    this.routes();
  }

   middleware() {
    this.app.use(_express2.default.json());
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, "..", "public")));
    this.app.enable("trust proxy");
  }

   database() {
    this.databaseConnection = _database2.default;
  }

   routes() {
    this.app.use("/api", _routes2.default);
  }
}

exports. default = new App().app;
