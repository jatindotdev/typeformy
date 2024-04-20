import { useAtom, useSetAtom } from 'jotai';
import {
  coerce,
  date,
  email,
  minLength,
  parse,
  regex,
  string,
  url,
  ValiError,
} from 'valibot';
import type { Question } from '~/components/ui/form-input';
import { answer, error } from '~/lib/store';

const createValidationSchema = (type: Question['type']) => {
  switch (type) {
    case 'email':
      return string([email("Hmm... that email doesn't look right")]);
    case 'tel':
      return string([
        regex(/^(?:\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number'),
      ]);
    case 'url':
      return string([
        url("Hmm... that URL doesn't look right. Please check again"),
      ]);
    case 'date':
      return coerce(
        date("That date isn't valid."),
        value => new Date(value as string)
      );
    default:
      return string([minLength(1, 'This field is required')]);
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
