import '../css/auth.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Field } from '../assets/Field';
import Spinner from '../assets/Spinner';
import CheckOutSteps from '../assets/CheckOutSteps';
import { shippingValidationSchema } from './ShippingValidationSchema';
import { saveShippingAddress } from '../../actions/index';

function Shipping({ history }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  return (
    <Formik
      initialValues={{
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      }}
      validationSchema={shippingValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        console.log(values);
        dispatch(
          saveShippingAddress(values, () => {
            resetForm({});
            setSubmitting(false);
            history.push('/payment');
          })
        );
      }}
    >
      {({ dirty, isValid, isSubmitting, values }) => (
        <div className='container'>
          <CheckOutSteps step1 />
          <h1>Shipping</h1>
          <Form>
            <div className='form-group'>
              <Field
                className='form-control'
                label='Digite su Direccion'
                name='address'
                placeholder='Direccion'
                value={values.address}
              />
            </div>
            <div className='form-group'>
              <Field
                className='form-control'
                label='Digite su Ciudad'
                name='city'
                placeholder='Ciudad'
                value={values.city}
              />
            </div>
            <div className='form-group'>
              <Field
                className='form-control'
                label='Codigo Postal'
                name='postalCode'
                placeholder='Codigo Postal'
                value={values.postalCode}
              />
            </div>
            <div className='form-group'>
              <Field
                className='form-control'
                label='Digite su Pais'
                name='country'
                placeholder='Pais'
                value={values.country}
              />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
              {isSubmitting ? <Spinner /> : 'Continuar'}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Shipping;
