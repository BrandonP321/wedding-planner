import _ from "lodash";

export class EnumUtils {
  /** Inverts an enum and sets its values to empty strings */
  public static invertWithNewValues = <T extends { [key: string]: any }, V>(
    obj: T,
    value: V
  ): { [key in T[keyof T]]: string } => {
    const keysArr = _.keys(_.invert(obj)).map((key) => ({ key }));

    const keysObj = _.keyBy(keysArr, (o) => o.key) as any;

    let key: keyof typeof keysObj;
    for (key in keysObj) {
      keysObj[key] = value;
    }

    return keysObj;
  };
}
