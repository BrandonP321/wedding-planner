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
}
