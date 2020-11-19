import * as Yup from 'yup';
/*
direccion: '',
city: '',
postal_code: '',
country: '',
*/

export const shippingValidationSchema = () => {
  const ShippingValidationSchema = Yup.object().shape({
    address: Yup.string().required('Debe incluir una direccion'),
    city: Yup.string().required('Debe incluir su ciudad'),
    postalCode: Yup.string().required('Debe incluir su codigo postal'),
    country: Yup.string().required('Debe incluir su pais'),
  });

  return ShippingValidationSchema;
};
