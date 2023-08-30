export const createExportedSlice = <T, A extends {}>(
  reducer: T,
  actions: A
) => {
  return {
    actions,
    reducer,
  };
};
