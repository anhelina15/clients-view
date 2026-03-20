import { ObjectSchema, ValidationError } from 'yup';

export const createValidator =
  <T extends object>(schema: ObjectSchema<T>) =>
  (values: T) => {
    try {
      schema.validateSync(values, { abortEarly: false });

      return {};
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });

        return errors;
      }

      return {};
    }
  };
