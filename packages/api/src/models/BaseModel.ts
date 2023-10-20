import { DataTypes, Model, UpdateOptions } from "sequelize";
import { ModelTypes } from ".";
import { DefaultModel } from "@wedding-planner/shared/common/types";

type ModelWithId = { id?: number };

type CreateOrUpdateResponse = { successful: boolean; res: { id: number } };

export class BaseModel<
  TModelAttributes extends Required<ModelWithId> = any,
  TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes> {
  public static getCreateAttributesJSON(params: any): any;
  public static getCreateAttributesJSON({
    model,
  }: ModelTypes.ModelCreationOrUpdateParams<ModelWithId>): ModelWithId {
    return {
      ...model,
    };
  }
  public static getCreateOptions(params: any): any;
  public static getCreateOptions({
    transaction,
  }: ModelTypes.ModelCreationOrUpdateParams<ModelWithId>) {
    return {
      transaction,
    };
  }

  public static getUpdateAttributesJSON(params: any): any;
  public static getUpdateAttributesJSON(
    params: ModelTypes.ModelCreationOrUpdateParams<ModelWithId>
  ) {
    return this.getCreateAttributesJSON(params);
  }

  public static getUpdateOptions(params: any): any;
  public static getUpdateOptions({
    model,
    transaction,
  }: ModelTypes.ModelCreationOrUpdateParams<ModelWithId>): UpdateOptions<ModelWithId> {
    return {
      where: { id: model.id },
      transaction,
    };
  }

  protected static async _createOrUpdate<T extends ModelWithId>(
    params: ModelTypes.ModelCreationOrUpdateParams<T>
  ): Promise<CreateOrUpdateResponse> {
    const { model } = params;
    const modelId = model.id;

    if (modelId !== undefined) {
      const [affectedCount] = await this.update(
        this.getUpdateAttributesJSON(params),
        this.getUpdateOptions(params)
      );
      return { successful: affectedCount > 0, res: { id: modelId } };
    } else {
      const newModel = await this.create(this.getCreateAttributesJSON(params), {
        transaction: params.transaction,
      });
      return { successful: true, res: { id: newModel.dataValues.id } };
    }
  }
}

export namespace BaseModel {
  export const SchemaAttributes = {
    [DefaultModel.Field.ID]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    [DefaultModel.Field.CREATED_AT]: DataTypes.DATE,
    [DefaultModel.Field.UPDATED_AT]: DataTypes.DATE,
  };
}
