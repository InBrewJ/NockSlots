export const prettyPrint = (msg: Record<string, unknown>) =>
  JSON.stringify(msg, null, 2);