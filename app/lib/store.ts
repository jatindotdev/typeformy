import { atom } from 'jotai';
import type { Question } from '~/components/ui/form-input';

export const questions = [
  {
    id: '1',
    text: "First off, what's your name?",
    required: true,
    type: 'text',
  },
  {
    id: '2',
    text: 'What is your email?',
    required: true,
    type: 'email',
  },
  {
    id: '3',
    text: 'What is your phone number?',
    required: true,
    type: 'tel',
  },
  {
    id: '4',
    text: 'Yours website URL?',
    required: false,
    type: 'url',
  },
  {
    id: '5',
    text: 'What is your date of birth?',
    required: true,
    type: 'date',
  },
  {
    id: '6',
    text: 'Country?',
    required: true,
    type: 'dropdown',
    metadata: {
      // mutliple: true, // can be used for multi-select dropdown
      options: [
        'India',
        'United States',
        'United Kingdom',
        'Australia',
        'Zimbabwe',
      ],
    },
  },
] as Question[];

interface Answers {
  [questionId: string]: {
    text: string;
    error: string | null;
  } | null;
}

export const currentQuestion = atom(0);
export const answers = atom<Answers>({});

const currentQuestionId = atom(
  get => questions[get(currentQuestion)]?.id ?? null
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
