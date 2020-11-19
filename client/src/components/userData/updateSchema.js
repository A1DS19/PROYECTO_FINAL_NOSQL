import * as Yup from 'yup';

export const updateValidationSchema = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debe incluir un email valido')
      .required('Debe incluir un email'),
    name: Yup.string().required('Debe incluir su nombre'),
    lastName: Yup.string().required('Debe incluir apellido'),
  });
  return validationSchema;
};
