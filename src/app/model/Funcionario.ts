import bcrypt from "bcryptjs";
import { Model, DataTypes, type Sequelize } from "sequelize";

class Funcionario extends Model {
  public nome!: string;
  public cpf!: string;
  public matricula!: string;
  public ativo!: number;
  public senha!: string;
  public primeiro_acesso!: boolean;
  public expirar_senha_provisoria!: string;
  public ip_login!: string;
  public login_ativo!: string;

  static initModel(sequelize: Sequelize): void {
    this.init(
      {
        nome: {
          type: DataTypes.STRING,
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
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "CPF é obrigatório",
            },
          },
        },
        matricula: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Matricula é obrigatório",
            },
          },
        },
        ativo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Ativo é obrigatório",
            },
          },
        },
        primeiro_acesso: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        senha: {
          type: DataTypes.STRING,
        },
        expirar_senha_provisoria: {
          type: DataTypes.DATE,
        },
        login_ativo: {
          type: DataTypes.BOOLEAN,
        },
        ip_login: {
          type: DataTypes.STRING,
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
  async validarSenha(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.senha);
  }
}

export default Funcionario;
