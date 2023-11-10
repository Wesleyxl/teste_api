"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _AuthController = require('../app/controller/AuthController'); var _AuthController2 = _interopRequireDefault(_AuthController);
var _Auth = require('../app/middleware/Auth'); var _Auth2 = _interopRequireDefault(_Auth);

const route = _express.Router.call(void 0, );

route.get("/test", (req, res) => {
  res.json("Hello World");
});

route.post("/auth/login", _AuthController2.default.login);
route.post("/auth/esqueceu-senha", _AuthController2.default.esqueceuSenha);
route.post("/auth/mudar-senha", _Auth2.default, _AuthController2.default.mudarSenha);
route.post("/auth/gerar-senha-provisoria", _AuthController2.default.gerarSenhaProvisoria);

route.get("/teste/ativo", _Auth2.default, (req, res) => {
  res.json("logado");
});

exports. default = route;
