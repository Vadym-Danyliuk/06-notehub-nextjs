import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import * as Yup from 'yup';
import { RiAdminFill } from 'react-icons/ri';

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  closeModal: () => void;
}

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Назва повинна містити мінімум 3 символи')
    .max(50, 'Назва повинна містити максимум 50 символів')
    .required('Обов\'язкове поле'),
  content: Yup.string().max(500, 'В нотатці максимум 500 символів'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Обов\'язкове поле'),
});

const NoteForm = ({ closeModal }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      closeModal();
    },
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.formGroup}>
          Заголовок
          <Field className={css.input} name="title" type="text" />
          <ErrorMessage className={css.error} name="title" component="span" />
        </label>

        <label className={css.formGroup}>
          Нотатка          <Field
            as="textarea"
            rows={8}
            className={css.textarea}
            name="content"
          />
          <ErrorMessage className={css.error} name="content" component="span" />
        </label>

        <label className={css.formGroup}>
          Тип нотатки
          <Field className={css.select} as="select" name="tag">
            <option value="Todo">Доробити</option>
            <option value="Work">Робота</option>
            <option value="Personal">Особисте</option>
            <option value="Meeting">Зустріч</option>
            <option value="Shopping">Покупки  </option>
          </Field>
          <ErrorMessage className={css.error} name="tag" component="span" />
        </label>
        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={closeModal}
          >
            Скасувати
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            <RiAdminFill />
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
