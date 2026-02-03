import type { AdapterOptions, TestownikQuestion, TestownikQuiz } from "@/types";
import { readFileSync, writeFileSync } from "node:fs";

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
    writeFileSync(this.options.outputFilename, data, "utf8");
  }
}
