"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable @typescript-eslint/no-invalid-void-type */

var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwt = require('../../config/jwt'); var _jwt2 = _interopRequireDefault(_jwt);
var _Funcionario = require('../model/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);






exports. default = async (
  req,
  res,
  next
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  const [, token] = authorization.split(" ");

  if (!token || token === undefined) {
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  try {
    const data = _jsonwebtoken2.default.verify(token, _jwt2.default.jwt_secret) ;

    const { matricula } = data;

    const funcionario = await _Funcionario2.default.findOne({
      where: {
        matricula,
      },
    });

    if (!funcionario) {
      return res.status(401).json({
        errors: ["Unauthorized"],
      });
    }

    req.matricula = funcionario.matricula;

    next();
  } catch (e) {
    return res.status(401).json({
      errors: ["Unauthorized"],
    });
  }
};
