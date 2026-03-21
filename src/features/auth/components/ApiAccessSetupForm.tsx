import { Form, Field } from 'react-final-form';
import * as yup from 'yup';

import Button from '@/core-ui/components/atoms/Button';
import TextField from '@/core-ui/components/molecules/TextField';
import { createValidator } from '@/shared/utils/createValidator';
import FORM_FIELDS from '@/shared/consts/formFields';
import { useAuth } from '@/features/auth/contexts/AuthContext';

const apiKeySchema = yup.object({
  [FORM_FIELDS.API_KEY]: yup
    .string()
    .min(5, 'API klíč musí mít alespoň 5 znaků')
    .required('Pole API klíč je povinné'),
  [FORM_FIELDS.USER]: yup.string().email('Neplatný email').required('Pole Uživatel je povinné'),
  [FORM_FIELDS.INSTANCE]: yup
    .string()
    .min(2, 'Instance musí mít alespoň 2 znaky')
    .trim()
    .required('Pole Instance je povinné'),
});

const validate = createValidator(apiKeySchema);

interface ApiFormValues {
  [FORM_FIELDS.API_KEY]: string;
  [FORM_FIELDS.USER]: string;
  [FORM_FIELDS.INSTANCE]: string;
}

interface ApiAccessSetupFormProps {
  onClose: () => void;
}

export const ApiAccessSetupForm = ({ onClose }: ApiAccessSetupFormProps) => {
  const { login } = useAuth();

  const handleSubmit = (values: ApiFormValues) => {
    login(values[FORM_FIELDS.API_KEY], values[FORM_FIELDS.USER], values[FORM_FIELDS.INSTANCE]);
    onClose();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Field
              name={FORM_FIELDS.API_KEY}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label="API Klíč"
                  placeholder="crm-..."
                  error={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name={FORM_FIELDS.USER}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label="Uživatel (Email)"
                  placeholder="email@example.com"
                  error={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name={FORM_FIELDS.INSTANCE}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label="Instance"
                  placeholder="Vaše instance"
                  error={meta.touched && meta.error}
                />
              )}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Zrušit
            </Button>
            <Button type="submit" isDisabled={submitting || pristine}>
              Uložit a přihlásit se
            </Button>
          </div>
        </form>
      )}
    />
  );
};
