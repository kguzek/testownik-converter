import { REPO_NAME } from "@/constants";

import chalk from "chalk";

const formatMessage = (emoji: string, message: string) =>
  `\n${emoji} ${chalk.dim("[")}${chalk.bgCyan.black(REPO_NAME)}${chalk.reset.dim("]")} ${message}`;

export const logger = {
  print: console.log,
  info: (message: string) =>
    console.info(formatMessage("🤖", chalk.cyan(message))),
  warn: (message: string) =>
    console.warn(formatMessage("⚠️", chalk.yellow(message))),
  error: (message: string) =>
    console.error(formatMessage("❌", chalk.red(message))),
};
