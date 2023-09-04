export type MapOfStrings = { [key: string]: string };
export type MapOfNumbers = { [key: string]: number };
export type MapOfBooleans = { [key: string]: boolean };

export type InvertedEnum<T extends {}, Value> = { [key in T[keyof T]]: Value };
export type EnumValue<T extends {}> = T[keyof T];

export type SomePartial<T extends {}, PartialFields extends keyof T> = Omit<
  T,
  PartialFields
> &
  Partial<Pick<T, PartialFields>>;

export type ReverseEnum<E extends {}, V> = {
  [key in E[keyof E]]: V;
};

export type AllOrNone<T extends {}> =
  | Required<T>
  | { [key in keyof T]?: never };
