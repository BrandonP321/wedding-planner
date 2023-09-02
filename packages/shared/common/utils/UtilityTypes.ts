export type MapOfStrings = { [key: string]: string };
export type MapOfNumbers = { [key: string]: number };
export type MapOfBooleans = { [key: string]: boolean };

export type SomePartial<T extends {}, PartialFields extends keyof T> = Omit<
  T,
  PartialFields
> &
  Partial<Pick<T, PartialFields>>;

export type ReverseEnum<E extends {}, V> = {
  [key in E[keyof E]]: V;
};
