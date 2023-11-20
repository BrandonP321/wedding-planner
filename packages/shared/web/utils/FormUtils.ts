import { values } from "lodash";

export class FormUtils {
  public static getEmptyTextFieldsFromEnum<T extends string>(
    enumObj: Record<string, T>
  ) {
    return values(enumObj).reduce((acc, cur) => {
      acc[cur] = "";
      return acc;
    }, {} as Record<T, string>);
  }
}
