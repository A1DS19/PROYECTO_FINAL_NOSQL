import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Field } from '../assets/Field';
import Spinner from '../assets/Spinner';
import { signinValidationSchema } from './authValidationSchema';
import { signin } from '../../actions/index';
import ErrorMessage from '../assets/ErrorMessage';

function Signin({ signin, history, errorMessage }) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signinValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        signin(values, () => {
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
              Iniciar Sesion
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </div>
            <div className='card-body'>
              <Form>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Email'
                    type='text'
                    name='email'
                    placeholder='Digite su email'
                  />
                </div>
                <div className='form-group'>
                  <Field
                    className='form-control'
                    label='Contrasena'
                    name='password'
                    type='password'
                    placeholder='Digite su contrasena'
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
}

const mapStateToProps = ({ auth }) => {
  return { errorMessage: auth.errorMessage };
};

export default connect(mapStateToProps, { signin })(Signin);
