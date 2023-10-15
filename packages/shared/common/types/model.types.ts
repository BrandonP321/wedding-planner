import { DataTypes } from "sequelize";
import { WithComputedKeys } from "../utils";

export namespace DefaultModel {
  export const Field = {
    ID: "id",
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt",
  } as const;

  export type Attributes = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  };

  export const SchemaAttributes = {
    [Field.ID]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    [Field.CREATED_AT]: DataTypes.DATE,
    [Field.UPDATED_AT]: DataTypes.DATE,
  };
}
