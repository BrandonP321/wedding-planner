export type APIGatewayResource = {
  handlerDirName?: string;
  nestedHandlers?: Record<string, APIGatewayResource>;
};

const getTypedLambdaResources = <T extends Record<string, APIGatewayResource>>(
  resources: T
): T => resources;

export const APIHandlers = getTypedLambdaResources({
  "hello-world": {
    handlerDirName: "helloWorld",
    nestedHandlers: {
      "bye-world": {
        handlerDirName: "goodbyeWorld",
      },
    },
  },
});
