import { DataTypes, Model, Sequelize } from "sequelize";
import { VendorAccountModel } from "@wedding-planner/shared/api/models/vendorAccount";
import { BaseModel } from "../BaseModel";
import { KeyOf, RegexUtils } from "@wedding-planner/shared/common";
import bcrypt from "bcrypt";

export default class VendorAccount extends Model<
  VendorAccountModel.Attributes,
  VendorAccountModel.Base
> {
  // Declaring password for type safety in hooks
  declare password: KeyOf<VendorAccountModel.Attributes, "password">;

  public static includedAttributes: VendorAccountModel.IncludedAttributes[] = [
    "id",
    "businessName",
    "createdAt",
    "email",
    "fullName",
    // "jwtHash",
    "phoneNumber",
    "updatedAt",
  ];

  public validatePassword(password: string) {
    return bcrypt.compare(password, this.dataValues.password);
  }

  public toJSON(): VendorAccountModel.Response {
    return {
      id: this.dataValues.id,
      email: this.dataValues.email,
      fullName: this.dataValues.fullName,
      businessName: this.dataValues.businessName,
      phoneNumber: this.dataValues.phoneNumber,
      createdAt: this.dataValues.createdAt,
      updatedAt: this.dataValues.updatedAt,
    };
  }
}

export const tempVendorAccountInit = (sequelize: Sequelize) =>
  VendorAccount.init(
    {
      ...BaseModel.SchemaAttributes,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: RegexUtils.passwordRegex,
        },
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: RegexUtils.phoneRegex,
        },
      },
    },
    {
      sequelize,
      modelName: VendorAccountModel.Name,
      tableName: VendorAccountModel.Name,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
      hooks: {
        beforeCreate: async (account) => {
          account.dataValues.password = await getHashedPassword(account);
        },
        beforeUpdate: async (account) => {
          if (account.changed("password")) {
            account.dataValues.password = await getHashedPassword(account);
          }
        },
      },
    }
  );

function getHashedPassword(account: VendorAccount) {
  const { password } = account.dataValues;

  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
}
