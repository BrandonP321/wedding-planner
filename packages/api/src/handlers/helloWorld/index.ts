export const lambdaHandler = async () => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello World again!!!",
    }),
  };
};
