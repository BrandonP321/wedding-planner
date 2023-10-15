export const lambdaHandler = async () => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "This is a default handler",
    }),
  };
};
