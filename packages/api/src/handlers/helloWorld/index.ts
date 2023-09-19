export const handler = async () => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello World again!!!",
    }),
  };
};
