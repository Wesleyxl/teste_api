"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _sequelize = require('sequelize');

class Funcionario extends _sequelize.Model {
  
  
  
  
  
  
  
  
  

  static initModel(sequelize) {
    this.init(
      {
        nome: {
          type: _sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 255],
              msg: "Nome precisa ter entre 3 e 255 caracteres",
            },
            notNull: {
              msg: "Nome é obrigatório",
            },
          },
        },
        cpf: {
          type: _sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "CPF é obrigatório",
            },
          },
        },
        matricula: {
          type: _sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Matricula é obrigatório",
            },
          },
        },
        ativo: {
          type: _sequelize.DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Ativo é obrigatório",
            },
          },
        },
        primeiro_acesso: {
          type: _sequelize.DataTypes.BOOLEAN,
          allowNull: false,
        },
        senha: {
          type: _sequelize.DataTypes.STRING,
        },
        expirar_senha_provisoria: {
          type: _sequelize.DataTypes.DATE,
        },
        login_ativo: {
          type: _sequelize.DataTypes.BOOLEAN,
        },
        ip_login: {
          type: _sequelize.DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: "funcionarios",
      }
    );

    // hash da senha antes de salvar
    // this.addHook("beforeSave", async (funcionario: Funcionario) => {
    //   if (funcionario.senha) {
    //     funcionario.senha = await bcrypt.hash(funcionario.senha, 8);
    //   }
    // });
  }

  // validando a senha
  async validarSenha(password) {
    return await _bcryptjs2.default.compare(password, this.senha);
  }
}

exports. default = Funcionario;
