import * as Yup from 'yup';

export const authValidationSchema = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debe incluir un email valido')
      .required('Debe incluir un email'),
    password: Yup.string()
      .required('Debe incluir una contrasena')
      .min(6, 'La contrasena debe tener minimo 6 caracteres')
      .max(20, 'La contrasena debe tener maximo 20 carateres'),
    confirm_password: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Las contrasenas deben ser iguales'
      ),
    }),
    name: Yup.string().required('Debe incluir su nombre'),
    lastName: Yup.string().required('Debe incluir apellido'),
  });
  return validationSchema;
};

export const signinValidationSchema = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debe incluir un email valido')
      .required('Debe incluir un email'),
    password: Yup.string()
      .required('Debe incluir una contrasena')
      .min(6, 'La contrasena debe tener minimo 6 caracteres')
      .max(20, 'La contrasena debe tener maximo 20 carateres'),
    confirm_password: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Las contrasenas deben ser iguales'
      ),
    }),
  });
  return validationSchema;
};
