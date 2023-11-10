"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _Funcionario = require('../app/model/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const sequelize = new (0, _sequelize.Sequelize)(
  _database2.default.database,
  _database2.default.username,
  _database2.default.password,
  {
    host: _database2.default.host,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

// models arrays
const models = [_Funcionario2.default];

// init models
models.forEach((model) => {
  model.initModel(sequelize);
});

// associations

exports. default = sequelize;
