export * from "./slices";
export * from "./hooks";

type FuncArray = (() => void)[];

export const createStoreHelper = <I extends FuncArray, D extends FuncArray>(
  initializers: I,
  destroyers: D
) => {
  const init = () => {
    initializers.forEach((initializer) => initializer());
  };

  const destroy = () => {
    destroyers.forEach((destroyer) => destroyer());
  };

  return {
    init,
    destroy,
  };
};
