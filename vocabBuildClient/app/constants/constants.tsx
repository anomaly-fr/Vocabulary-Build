
// eslint-disable-next-line global-require

export const nodeConsole = require('console');

export const myConsole = new nodeConsole.Console(
  process.stdout,
  process.stderr
);

