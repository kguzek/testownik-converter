import boxen from "boxen";
import chalk from "chalk";

import {
  AUTHOR_EMAIL,
  AUTHOR_NAME,
  AUTHOR_URL,
  REPO_NAME,
  REPO_URL,
  TESTOWNIK_URL,
  VERSION,
} from "@/constants";

export const cardIntro = boxen(
  chalk.white(`
Welcome to ${REPO_NAME} version ${VERSION}!

Author: ${AUTHOR_NAME}
GitHub: ${chalk.underline(AUTHOR_URL)}
Email: ${AUTHOR_EMAIL}
`),
  {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "cyan",
    textAlignment: "center",
  },
);

const importQuizUrl = `${TESTOWNIK_URL}/import-quiz`;

export const cardOutro = boxen(
  chalk.white(`
Thank you for using ${REPO_NAME}.

📥 Import your quiz 📥

${chalk.underline(importQuizUrl)}

⭐ Star me on GitHub! ⭐
  
${chalk.underline(REPO_URL)}
`),
  {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow",
    textAlignment: "center",
  },
);

const generateErrorCard = (text: string) =>
  boxen(chalk.white(text), {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "red",
    textAlignment: "center",
  });

export const cardError = generateErrorCard(`

An unexpected error occurred during the program's execution.
If the problem persists, please report it on GitHub:

${chalk.underline(REPO_URL + "/issues/new")}
`);
