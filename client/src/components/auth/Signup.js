import '../css/auth.css';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Field } from '../assets/Field';
import Spinner from '../assets/Spinner';
import ErrorMessage from '../assets/ErrorMessage';
import { authValidationSchema } from './authValidationSchema';
import { signup } from '../../actions/index';

export const Signup = ({ signup, history, errorMessage }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirm_password: '',
        name: '',
        lastName: '',
      }}
      validationSchema={authValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        delete values.confirm_password;
        setSubmitting(true);

        signup(values, () => {
          history.push('/');
        });

        resetForm({});
        setSubmitting(false);
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <div id='center'>
          <div className='card bg-light mb-3 ' style={{ width: '35rem' }}>
            <div className='card-header'>
              Registro
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </div>
            <div className='card-body'>
              <Form>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Email'
                    name='email'
                    type='text'
                    placeholder='Email'
                  />
                </div>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Ingrese su nombre'
                    name='name'
                    type='text'
                    placeholder='Nombre'
                  />
                </div>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Ingrese su apellido'
                    name='lastName'
                    type='text'
                    placeholder='Apellido'
                  />
                </div>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Contrasena'
                    name='password'
                    type='password'
                    placeholder='Contrasena'
                  />
                </div>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Confirmar Contrasena'
                    name='confirm_password'
                    type='password'
                    placeholder='Repita su contrasena'
                  />
                </div>

                <button
                  disabled={!dirty || !isValid}
                  type='submit'
                  className='btn btn-primary btn-block'
                >
                  {isSubmitting ? <Spinner /> : 'Submit'}
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => {
  return { errorMessage: auth.errorMessage };
};

export default connect(mapStateToProps, { signup })(Signup);
