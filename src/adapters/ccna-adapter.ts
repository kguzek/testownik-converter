import type { TestownikQuestion, TestownikAnswer } from "@/types";

import { BaseAdapter } from "./base-adapter";
import { logger } from "@/logging";

const QUESTION_REGEX =
  /^(?<number>\d+)\.\s+(?<question>[\s\S]+?)\n^-\s+(?<answers>.+(?:\r?\n.+)+)/gm;

const ANSWER_REGEX = /^(?<correct>\[✓\]\s+)?(?<answer>[\s\S]+)/m;

export class CcnaAdapter extends BaseAdapter {
  convertQuestions() {
    const questions: TestownikQuestion[] = [];
    for (const questionMatch of this.inputContent.matchAll(QUESTION_REGEX)) {
      if (questionMatch.groups == null) {
        continue;
      }
      const questionText = questionMatch.groups.question?.trim();
      if (!questionText) {
        logger.warn("Skipping question with no text");
        continue;
      }

      const answersText = questionMatch.groups.answers?.trim();
      if (!answersText) {
        logger.warn(`Skipping question with no answers: '${questionText}'`);
        continue;
      }

      const answers: TestownikAnswer[] = [];
      for (const fullAnswerText of answersText.split(/\r?\n-\s+/)) {
        const answerMatch = fullAnswerText.match(ANSWER_REGEX);
        if (answerMatch?.groups == null) {
          logger.warn(`Skiping invalid answer: ${fullAnswerText}`);
          continue;
        }
        const isCorrect = answerMatch?.groups?.correct != null;
        const answerText = answerMatch.groups?.answer?.trim();
        if (!answerText) {
          logger.warn(
            `Skipping answer with no text in question: ${questionText}`,
          );
          continue;
        }
        const answer: TestownikAnswer = {
          text: answerText,
          is_correct: isCorrect,
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
