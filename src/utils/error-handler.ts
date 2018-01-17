export const errorHandler = (e: Error) => {
  throw  new Error(JSON.stringify(e));
};