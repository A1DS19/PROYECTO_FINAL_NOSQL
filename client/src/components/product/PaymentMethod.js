import '../css/auth.css';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Col, FormCheck, FormGroup, FormLabel } from 'react-bootstrap';
import Spinner from '../assets/Spinner';
import CheckOutSteps from '../assets/CheckOutSteps';
import { savePaymentMethod } from '../../actions/index';

function PaymentMethod({ history }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const paymentvalidationSchema = Yup.object().shape({
    paymentMethod: Yup.string().required('Debe seleccionar metodo de pago'),
  });

  return (
    <Formik
      initialValues={{
        paymentMethod: 'Paypal',
      }}
      validationSchema={paymentvalidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        console.log(values);
        dispatch(
          savePaymentMethod(values, () => {
            resetForm({});
            history.push('/placeorder');
          })
        );
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleChange, handleBlur }) => (
        <div className='container'>
          <CheckOutSteps step1 step2 />
          <h1>Metodo de Pago</h1>
          <Form>
            <FormGroup>
              <FormLabel as='legend'>Seleccione Metodo</FormLabel>
              <Col>
                <FormCheck
                  type='radio'
                  label='Paypal o Tarjeta de Credito'
                  id='Paypal'
                  name='paymentMethod1'
                  value={values.paymentMethod}
                  checked
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></FormCheck>
              </Col>
            </FormGroup>

            <button type='submit' className='btn btn-primary'>
              {isSubmitting ? <Spinner /> : 'Continuar'}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default PaymentMethod;
