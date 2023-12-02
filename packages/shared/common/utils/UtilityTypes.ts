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

export type ObjectValues<T> = T[keyof T];

export type SomePartial<T extends {}, PartialFields extends keyof T> = Omit<
  T,
  PartialFields
> &
  Partial<Pick<T, PartialFields>>;

export type AllOrNone<T extends {}> =
  | Required<T>
  | { [key in keyof T]?: never };

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const asWriteable = <T>(obj: T): Writeable<T> => obj as Writeable<T>;

/**
 * Allows use dot notation to access properties
 * on `T` when the keys of `T` are computed
 */
export type WithComputedKeys<T, Keys extends keyof T> = {
  [key in Keys]: T[key];
};

export type KeyOf<T, K extends keyof T> = K;

export type TypedOmit<T, K extends keyof T> = Omit<T, K>;

export type OptionalKey<T, K extends keyof any> = T extends { [P in K]?: any }
  ? Omit<T, K> & { [P in K]?: T[K] }
  : T;

export type DeepOptionalKey<T, K extends keyof any> = OptionalKey<
  {
    [P in keyof T]: T[P] extends (infer U)[]
      ? DeepOptionalKeyArray<U, K>[]
      : T[P] extends object
      ? DeepOptionalKey<T[P], K>
      : T[P];
  },
  K
>;

type DeepOptionalKeyArray<T, K extends keyof any> = T extends (infer U)[]
  ? DeepOptionalKeyArray<U, K>[]
  : DeepOptionalKey<T, K>;

type OmitKey<T, K extends keyof any> = T extends { [P in K]?: any }
  ? Omit<T, K>
  : T;

export type DeepOmitKey<T, K extends keyof any> = OmitKey<
  {
    [P in keyof T]: T[P] extends (infer U)[]
      ? DeepOmitKeyArray<U, K>[]
      : T[P] extends object
      ? DeepOmitKey<T[P], K>
      : T[P];
  },
  K
>;

type DeepOmitKeyArray<T, K extends keyof any> = T extends (infer U)[]
  ? DeepOmitKeyArray<U, K>[]
  : DeepOmitKey<T, K>;
