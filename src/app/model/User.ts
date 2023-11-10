import bcrypt from "bcryptjs";
import { Model, DataTypes, type Sequelize } from "sequelize";

import app from "../../config/app";

class User extends Model {
  public name!: string;
  public email!: string;
  public image!: string;
  public url!: string;
  public password_hash!: string;
  public password!: string;

  static initModel(sequelize: Sequelize): void {
    this.init(
      {
        name: {
          type: DataTypes.STRING,
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
          type: DataTypes.STRING,
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
          type: DataTypes.STRING,
          defaultValue: "",
        },
        url: {
          type: DataTypes.VIRTUAL,
          defaultValue: "",
          get() {
            if (this.image || this.image !== "") {
              return `${app.url}:${
                app.port
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
    this.addHook("beforeSave", async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // validate password
  }

  async passwordIsValid(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password_hash);
  }
}

export default User;
