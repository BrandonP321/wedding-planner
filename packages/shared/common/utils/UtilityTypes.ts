export type MapOfStrings = { [key: string]: string };
export type MapOfNumbers = { [key: string]: number };
export type MapOfBooleans = { [key: string]: boolean };

export type InvertedEnum<T extends Record<string, string>, Value> = {
  [key in T[keyof T]]: Value;
};
export type EnumValue<T extends Record<string, string>> = keyof InvertedEnum<
  T,
  string
>;

export type SomePartial<T extends {}, PartialFields extends keyof T> = Omit<
  T,
  PartialFields
> &
  Partial<Pick<T, PartialFields>>;

export type AllOrNone<T extends {}> =
  | Required<T>
  | { [key in keyof T]?: never };
