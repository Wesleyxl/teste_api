"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _sequelize = require('sequelize');

var _app = require('../../config/app'); var _app2 = _interopRequireDefault(_app);

class User extends _sequelize.Model {
  
  
  
  
  
  

  static initModel(sequelize) {
    this.init(
      {
        name: {
          type: _sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 255],
              msg: "Name must be between 3 and 255 characters",
            },
            notNull: {
              msg: "Name is required",
            },
          },
        },
        email: {
          type: _sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              msg: "Email must be valid",
            },
            notNull: {
              msg: "Email is required",
            },
            unique: true,
          },
        },
        image: {
          type: _sequelize.DataTypes.STRING,
          defaultValue: "",
        },
        url: {
          type: _sequelize.DataTypes.VIRTUAL,
          defaultValue: "",
          get() {
            if (this.image || this.image !== "") {
              return `${_app2.default.url}:${
                _app2.default.port
              }/public/images/users/${this.getDataValue("image")}`;
            }
          },
        },
      },
      {
        sequelize,
      }
    );

    // hash password
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    // validate password
  }

  async passwordIsValid(password) {
    return await _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = User;
