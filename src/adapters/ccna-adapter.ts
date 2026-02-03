import type { TestownikQuestion, TestownikAnswer } from "@/types";

import { BaseAdapter } from "./base-adapter";

const QUESTION_REGEX = new RegExp(
  String.raw`^(?:(?<number>\d+)\.\s+)?(?<question>.+)$\n(?<answers>(?:(?=^-\s).+$\n?)+\n?)`,
  "gm",
);

const ANSWER_REGEX = new RegExp(
  String.raw`^- (?<correct>\[✓\] )?(?<question>.+)$`,
  "gm",
);

export class CcnaAdapter extends BaseAdapter {
  convertQuestions() {
    QUESTION_REGEX.lastIndex = 0;
    const questions: TestownikQuestion[] = [];
    let questionMatch: RegExpExecArray | null;
    while (
      (questionMatch = QUESTION_REGEX.exec(this.inputContent)) != null &&
      questionMatch.groups != null
    ) {
      const answers: TestownikAnswer[] = [];
      ANSWER_REGEX.lastIndex = 0;

      const rawAnswers = questionMatch.groups.answers;
      let answerMatch: RegExpExecArray | null;
      while (
        (answerMatch = ANSWER_REGEX.exec(rawAnswers)) != null &&
        answerMatch.groups != null
      ) {
        const answer: TestownikAnswer = {
          text: answerMatch.groups.question,
          is_correct: answerMatch.groups.correct != null,
        };
        answers.push(answer);
      }
      if (answers.length === 0) {
        continue;
      }
      const question: TestownikQuestion = {
        text: questionMatch.groups.question,
        answers,
        multiple: answers.filter((answer) => answer.is_correct).length > 1,
      };
      if (questionMatch.groups.number != null) {
        question.order = Number(questionMatch.groups.number);
      }
      questions.push(question);
    }

    return questions;
  }
}
