import { useAtom, useSetAtom } from 'jotai';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {
  ValiError,
  coerce,
  custom,
  date,
  email,
  minLength,
  parse,
  string,
  url,
} from 'valibot';
import { answer, error } from '~/lib/store';
import type { Question } from '~/lib/types';

const createValidationSchema = (type: Question['type']) => {
  switch (type) {
    case 'email':
      return string([email("Hmm... that email doesn't look right.")]);
    case 'tel':
      return string([
        custom(
          value => isValidPhoneNumber(value),
          "Hmm... that phone number doesn't look right."
        ),
      ]);
    case 'url':
      return string([
        url("Hmm... that URL doesn't look right. Please check again!"),
      ]);
    case 'date':
      return coerce(
        date("That date isn't valid."),
        value => new Date(value as string)
      );
    default:
      return string([minLength(1, 'This field is required.')]);
  }
};

interface UseValidateProps {
  type: Question['type'];
}

export const useValidate = ({ type }: UseValidateProps) => {
  const [value, setValue] = useAtom(answer);
  const setError = useSetAtom(error);

  const onChange = (value: string) => {
    setValue(value);
    setError(null);
  };

  const validationSchema = createValidationSchema(type);

  const validate = () => {
    try {
      parse(validationSchema, value.text);
      return true;
    } catch (err) {
      if (err instanceof ValiError) {
        setError(err.message);
      }
      return false;
    }
  };

  return { value: value.text, onChange, validate, error: value.error };
};