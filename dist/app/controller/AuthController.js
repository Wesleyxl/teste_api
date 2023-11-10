"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwt = require('../../config/jwt'); var _jwt2 = _interopRequireDefault(_jwt);
var _Funcionario = require('../model/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);
var _SendEmail = require('../services/SendEmail');
var _gerarSenha = require('../utils/gerarSenha');

class AuthController {
  /**
   * Autentique o login do usuário.
   */
  async login(req, res) {
    try {
      // campos para realizar o login
      const { matricula, senha } = req.body;
      const ip = req.ip;

      // validando campos
      if (!matricula || !senha) {
        return res.status(400).json({
          sucesso: false,
          titulo: "Error ao realizar a requisição",
          mensagem: "O campo N° matrícula e senha são obrigatórios",
        });
      }

      // verificando se o motorista existe
      const motorista = await _Funcionario2.default.findOne({
        where: { matricula },
      });

      // retornando erro caso o motorista não existe
      if (!motorista) {
        return res.status(404).json({
          titulo: "Error ao realizar a requisição",
          mensagem: "Motorista não encontrado",
        });
      }

      // validando senha do motorista
      if (!(await _bcryptjs2.default.compare(senha, motorista.senha))) {
        return res.status(401).json({
          titulo: "Error ao realizar a requisição",
          mensagem: "Senha incorreta",
        });
      }

      // verifica a data/hora de expiração da senha provisória, caso for o primeiro acesso do motorista
      if (motorista.primeiro_acesso) {
        const dataExpiracaoSenha = new Date(motorista.expirar_senha_provisoria);

        if (dataExpiracaoSenha < new Date()) {
          return res.status(401).json({
            sucesso: false,
            titulo: "Error ao realizar a requisição",
            mensagem: "Senha provisoria expirada",
          });
        }
      }

      // cria o token de acesso valido por 24H
      const token = _jsonwebtoken2.default.sign(
        { matricula: motorista.matricula },
        _jwt2.default.jwt_secret,
        {
          expiresIn: _jwt2.default.jwt_expire_in,
        }
      );

      // atualizando dados do motorista para o login estar ativo
      await motorista.update({
        login_ativo: true,
        ip_login: ip,
      });

      return res.status(200).json({
        sucesso: true,
        token,
        motorista,
      });
    } catch (e) {
      return res.status(500).json({
        titulo: "Error no servidor",
        mensagem: "Erro ao realizar a requisição",
      });
    }
  }

  /**
   * Lida com a solicitação de recuperação de senha.
   */
  async esqueceuSenha(req, res) {
    try {
      const { cpf, matricula } = req.body;

      // validando cpf
      if (!cpf || cpf === "" || !matricula || matricula === "") {
        return res.status(400).json({
          titulo: "Error ao realizar a requisição",
          mensagem: "O campo CPF e N° matrícula são obrigatórios",
        });
      }

      // verificando se o motorista existe
      const motorista = await _Funcionario2.default.findOne({
        where: { cpf, matricula },
      });

      // retornando error caso o motorista não existe
      if (!motorista) {
        return res.status(404).json({
          titulo: "Error ao realizar a requisição",
          mensagem: "CPF ou N° matrícula não foi encontrado",
        });
      }

      // gerar senha provisória
      const senha_provisoria = await _gerarSenha.gerarPalavra.call(void 0, );

      const response = await _SendEmail.enviarEmailRecuperaSenha.call(void 0, 
        motorista.cpf,
        motorista.matricula,
        motorista.nome,
        senha_provisoria
      );

      if (response) {
        return res.status(200).json({
          sucesso: true,
          titulo: "Requisição realizada com sucesso",
          mensagem: "Sua solicitação foi enviada com sucesso!",
          data: response,
        });
      }

      return res.status(400).json({
        titulo: "Não foi possível realizar sua solicitação",
        mensagem: "Entre em contato com suporte",
      });
    } catch (e) {
      return res.status(500).json({
        titulo: "Error no servidor",
        mensagem: "Erro ao realizar a requisição",
      });
    }
  }

  /**
   * Muda a senha de um motorista
   */
  async mudarSenha(req, res) {
    try {
      const { matricula, senha } = req.body;

      // validando matricula e senha
      if (!matricula || !senha) {
        return res.status(400).json({
          titulo: "Error ao realizar a requisição",
          mensagem: "O campo N° matrícula e senha são obrigatórios",
        });
      }

      // verificando se o motorista existe
      const motorista = await _Funcionario2.default.findOne({
        where: { matricula },
      });

      // retornando error caso o motorista não exista
      if (!motorista) {
        return res.status(404).json({
          titulo: "Error ao realizar a requisição",
          mensagem: "Motorista não encontrado",
        });
      }

      // gerando hash da nova senha
      const nova_senha = await _bcryptjs2.default.hash(senha, 8);

      const response = await motorista.update({
        senha: nova_senha,
        primeiro_acesso: false,
      });

      if (response) {
        return res.status(200).json({
          sucesso: true,
          titulo: "Requisição realizada com sucesso",
          mensagem: "Senha alterada com sucesso",
        });
      }

      return res.status(500).json({
        titulo: "Error no servidor",
        mensagem: "Erro ao realizar a requisição",
      });
    } catch (e) {
      return res.status(500).json({
        titulo: "Error no servidor",
        mensagem: "Erro ao realizar a requisição",
      });
    }
  }

  /**
   * Gera uma senha temporária para um motorista com base em seu número de registro.
   */
  async gerarSenhaProvisoria(req, res) {
    try {
      const { matricula } = req.body;

      // validando matricula
      const motorista = await _Funcionario2.default.findOne({
        where: { matricula },
      });

      if (!motorista) {
        return res.status(400).json({
          sucesso: false,
          titulo: "Error ao realizar a requisição",
          mensagem: "Motorista não encontrado",
        });
      }

      // criando senha provisoria, gerando o hash e aplicando a data de expiração
      const nova_senha = await _gerarSenha.gerarPalavra.call(void 0, );
      const senha_hash = await _bcryptjs2.default.hash(nova_senha, 8);
      const data = new Date();
      const data_expira = data.setHours(data.getHours() + 2);

      // atualizando a senha do motorista
      const response = await motorista.update({
        senha: senha_hash,
        expirar_senha_provisoria: data_expira,
        primeiro_acesso: true,
      });

      if (response) {
        return res.status(200).json({
          sucesso: true,
          titulo: "Senha provisória gerada com sucesso",
          mensagem: `Sua senha é ${nova_senha}, irá expirar em 2 horas`,
        });
      }

      return res.status(500).json({
        titulo: "Error no servidor",
        mensagem: "Erro ao realizar a requisição",
      });
    } catch (error) {
      return res.status(500).json({
        titulo: "Error no servidor",
        mensagem: "Erro ao realizar a requisição",
      });
    }
  }
}
exports. default = new AuthController();
