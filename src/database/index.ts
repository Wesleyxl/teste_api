import { Sequelize } from "sequelize";

import Funcionario from "../app/model/Funcionario";
import dbConfig from "../config/database";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

// models arrays
const models = [Funcionario];

// init models
models.forEach((model) => {
  model.initModel(sequelize);
});

// associations

export default sequelize;
