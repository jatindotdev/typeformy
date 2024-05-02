'use client';

import { AnimatePresence } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Loader } from '~/components/loader';
import { Button } from '~/components/ui/button';
import { FormInput, type Question } from '~/components/ui/form-input';
import { useValidate } from '~/hooks/use-validation';
import { answers, currentQuestion, questions } from '~/lib/store';

interface CreateQuestionsProps {
  questions: Question[];
}

const createQuestions = ({ questions }: CreateQuestionsProps) => {
  const [, setQuestionIndex] = useAtom(currentQuestion);
  return questions.map((question, index) => {
    return {
      question: (
        <FormInput
          key={question.id}
          question={question}
          index={index + 1}
          onSubmit={e => {
            toast(e);
            // setQuestionIndex(prev => prev + 1);
          }}
        />
      ),
      props: useValidate({
        type: question.type,
      }),
    };
  });
};

export default function Form() {
  const [questionIndex, setQuestionIndex] = useAtom(currentQuestion);
  const questionsField = createQuestions({ questions });

  const handleNext = () => {
    const { validate } = questionsField[questionIndex].props;
    if (validate()) {
      setQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setQuestionIndex(prev => prev - 1);
  };

  return (
    <section className="w-full flex flex-col justify-center h-screen relative">
      <Loader progress={((questionIndex + 1) / questions.length) * 100} />
      <div className="h-screen">
        <AnimatePresence>
          {questionsField[questionIndex].question}
        </AnimatePresence>
      </div>
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
