import { atom } from 'jotai';
import type { Question } from './types';

interface Answers {
  [questionId: string]: {
    text: string;
    error: string | null;
  } | null;
}

export const questionsStore = atom<Question[]>([]);
export const currentQuestion = atom(0);
export const answers = atom<Answers>({});

const currentQuestionId = atom(
  get => get(questionsStore)[get(currentQuestion)]?.id ?? ''
);

export const answer = atom(
  get => get(answers)[get(currentQuestionId)] ?? { text: '', error: null },
  (get, set, value: string) => {
    set(answers, {
      ...get(answers),
      [get(currentQuestionId)]: {
        text: value,
        error: null,
      },
    });
  }
);

export const error = atom(null, (get, set, value: string | null) => {
  set(answers, {
    ...get(answers),
    [get(currentQuestionId)]: {
      text: get(answer)?.text ?? '',
      error: value,
    },
  });
});
