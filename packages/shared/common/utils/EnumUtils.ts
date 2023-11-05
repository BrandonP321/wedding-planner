import _ from "lodash";
import { InvertedEnum } from "../utils";

export class EnumUtils {
  /** Inverts an enum and sets its values to empty strings */
  public static invertWithNewValues = <T extends { [key: string]: any }, V>(
    obj: T,
    value: V
  ): InvertedEnum<T, V> => {
    const keysArr = _.keys(_.invert(obj)).map((key) => ({ key }));

    const keysObj = _.keyBy(keysArr, (o) => o.key) as any;

    let key: keyof typeof keysObj;
    for (key in keysObj) {
      keysObj[key] = value;
    }

    return keysObj;
  };

  public static toArrayOfValues = <T extends Record<string, string>>(
    obj: T
  ) => {
    return _.values(obj) as T[keyof T][];
  };
}
