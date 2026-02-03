import type { TestownikQuestion, TestownikAnswer } from "@/types";

import { BaseAdapter } from "./base-adapter";
import { logger } from "@/logging";

const QUESTION_REGEX = new RegExp(
  String.raw`^(?:(?<number>\d+)\.\s+)(?<question>[\s\S]+?)$\n(?<answers>(?:^- .+(?:\n(?!- ).+)*\n?)+)`,
  "gm",
);

const ANSWER_REGEX = new RegExp(
  String.raw`^- (?<correct>\[✓\] )?(?<answer>.+)$`,
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

      const questionText = questionMatch.groups.question?.trim();
      if (!questionText) {
        logger.warn("Skipping question with no text");
        continue;
      }

      const answersText = questionMatch.groups.answers;
      if (!answersText) {
        logger.warn(`Skipping question with no answers: '${questionText}'`);
        continue;
      }

      let answerMatch: RegExpExecArray | null;
      while (
        (answerMatch = ANSWER_REGEX.exec(answersText)) != null &&
        answerMatch.groups != null
      ) {
        const answerText = answerMatch.groups.answer?.trim();
        if (answerText == null) {
          logger.warn(
            `Skipping answer with no text in question: ${questionText}`,
          );
          continue;
        }
        const answer: TestownikAnswer = {
          text: answerText,
          is_correct: answerMatch.groups.correct != null,
        };
        answers.push(answer);
      }
      if (answers.length === 0) {
        continue;
      }
      const question: TestownikQuestion = {
        text: questionText,
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
