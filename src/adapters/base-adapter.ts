import { readFileSync, writeFileSync } from "node:fs";

import type { AdapterOptions, TestownikQuestion, TestownikQuiz } from "@/types";
import { logger } from "@/logging";

export abstract class BaseAdapter {
  protected inputContent!: string;
  protected options!: AdapterOptions;

  constructor(options: AdapterOptions) {
    const content = readFileSync(options.inputFilename, "utf8");

    this.inputContent = content;
    this.options = options;
  }

  protected abstract convertQuestions(): TestownikQuestion[];

  private createQuiz(): TestownikQuiz {
    const questions = this.convertQuestions();
    if (questions.length === 0) {
      throw new Error("Could not find any questions in the input file.");
    }
    logger.info(
      `Successfully imported ${questions.length} question${questions.length === 1 ? "" : "s"}!`,
    );
    const quiz: TestownikQuiz = {
      title: this.options.quizTitle,
      ...(this.options.quizDescription == null
        ? {}
        : { description: this.options.quizDescription }),
      questions,
    };
    return quiz;
  }

  writeOutput(): void {
    const quiz = this.createQuiz();
    const data = JSON.stringify(quiz, null, 2);
    const filename = this.options.outputFilename;
    writeFileSync(filename, data, "utf8");
    logger.info(`Converted quiz written to ${filename}.`);
  }
}
