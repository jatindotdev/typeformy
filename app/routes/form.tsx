import { useLoaderData } from '@remix-run/react';
import { AnimatePresence } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Loader } from '~/components/loader';
import { Button } from '~/components/ui/button';
import { FormInput } from '~/components/ui/form-input';
import { useValidate } from '~/hooks/use-validation';
import { currentQuestion, questionsStore } from '~/lib/store';
import type { Question } from '~/lib/types';

interface CreateQuestionsProps {
  questions: Question[];
}

const createQuestions = () => {
  const questions = useAtomValue(questionsStore);
  const setQuestionIndex = useSetAtom(currentQuestion);

  return questions.map((question, index) => {
    return {
      question: (
        <FormInput
          key={question.id}
          question={question}
          index={index + 1}
          onSubmit={value => {
            console.log(question.text, value);
            setQuestionIndex(prev => prev + 1);
          }}
        />
      ),
      props: useValidate({
        type: question.type,
      }),
    };
  });
};

export const loader = async () => {
  const questions = [
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
        // multiple: true, // can be used for multi-select dropdown
        options: [
          'India',
          'United States',
          'United Kingdom',
          'Australia',
          'Zimbabwe',
        ],
      },
    },
  ] satisfies Question[];

  return {
    questions,
  };
};

export default function Form() {
  const [questions, setQuestions] = useAtom(questionsStore);

  const data = useLoaderData<typeof loader>();
  setQuestions(data.questions);

  const [questionIndex, setQuestionIndex] = useAtom(currentQuestion);
  const questionsField = createQuestions();

  const handleNext = () => {
    const { validate } = questionsField[questionIndex].props;
    const required = questions[questionIndex].required;
    if (!required || validate()) {
      setQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setQuestionIndex(prev => prev - 1);
  };

  return (
    <section className="w-full flex flex-col justify-center h-screen overflow-hidden">
      <Loader progress={((questionIndex + 1) / questions.length) * 100} />
      <AnimatePresence>
        {questionsField[questionIndex].question}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <div className="flex justify-end items-center">
          <Button
            className="w-fit px-2 py-2 h-full rounded-r-none"
            onClick={handlePrev}
            disabled={questionIndex === 0}
          >
            <ChevronUp className="size-6" />
          </Button>
          <div className="h-full w-[1px] bg-blue-800" />
          <Button
            className="w-fit px-2 py-2 h-full rounded-l-none"
            onClick={handleNext}
            disabled={questionIndex === questions.length - 1}
          >
            <ChevronDown className="size-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
